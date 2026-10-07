import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "./db.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name.trim(), normalizedEmail, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the account.",
    });
  }
}


/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email address is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check whether the account exists
    const userResult = await pool.query(
      "SELECT id, name, email FROM users WHERE email = $1",
      [normalizedEmail]
    );

    // Don't reveal whether an email exists in the database
    if (userResult.rows.length === 0) {
      return res.json({
        success: true,
        message:
          "If an account exists for this email, a verification code has been sent.",
      });
    }

    // Generate a 6-digit verification code
    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Code expires after 10 minutes
    const expiresAt = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // Remove previous codes for this email
    await pool.query(
      "DELETE FROM password_reset_codes WHERE email = $1",
      [normalizedEmail]
    );

    // Store new code
    await pool.query(
      `INSERT INTO password_reset_codes
       (email, code, expires_at)
       VALUES ($1, $2, $3)`,
      [normalizedEmail, code, expiresAt]
    );

    // Send email
    await resend.emails.send({
      from: "MedFlow <onboarding@resend.dev>",
      to: [normalizedEmail],
      subject: "Your MedFlow password reset code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          
          <h2 style="color: #111827;">
            MedFlow Password Reset
          </h2>

          <p>
            Hello ${userResult.rows[0].name},
          </p>

          <p>
            We received a request to reset your MedFlow password.
          </p>

          <p>
            Your verification code is:
          </p>

          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            padding: 20px;
            background: #f3f4f6;
            text-align: center;
            border-radius: 10px;
          ">
            ${code}
          </div>

          <p>
            This code will expire in <strong>10 minutes</strong>.
          </p>

          <p>
            If you didn't request a password reset, you can safely ignore this email.
          </p>

          <p>
            — MedFlow Team
          </p>

        </div>
      `,
    });

    console.log(
      `Password reset code sent to ${normalizedEmail}`
    );

    res.json({
      success: true,
      message:
        "If an account exists for this email, a verification code has been sent.",
    });

  } catch (error) {
    console.error("Forgot password error:", error);

    res.status(500).json({
      success: false,
      message:
        "Something went wrong while processing the password reset request.",
    });
  }
}
export async function verifyResetCode(req, res) {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email and verification code are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const result = await pool.query(
      `SELECT id, email, expires_at
       FROM password_reset_codes
       WHERE email = $1 AND code = $2
       ORDER BY created_at DESC
       LIMIT 1`,
      [normalizedEmail, code]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code.",
      });
    }

    const resetCode = result.rows[0];

    if (new Date(resetCode.expires_at) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired.",
      });
    }

    res.json({
      success: true,
      message: "Verification code verified successfully.",
    });
  } catch (error) {
    console.error("Verify reset code error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while verifying the code.",
    });
  }
}
export async function resetPassword(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `UPDATE users
       SET password = $1
       WHERE email = $2
       RETURNING id, name, email`,
      [hashedPassword, normalizedEmail]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    await pool.query(
      "DELETE FROM password_reset_codes WHERE email = $1",
      [normalizedEmail]
    );

    res.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while updating your password.",
    });
  }
}