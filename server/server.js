import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./db.js";
import {
  signup,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from "./auth.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/* =========================
   MIDDLEWARE
========================= */

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

/* =========================
   AUTH ROUTES
========================= */

app.post("/api/auth/forgot-password", forgotPassword);

app.post(
  "/api/auth/verify-reset-code",
  verifyResetCode
);
app.post(
  "/api/auth/reset-password",
  resetPassword
);

/* =========================
   TEST API
========================= */

app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS current_time"
    );

    res.json({
      success: true,
      message: "Backend connected to Neon successfully.",
      databaseTime: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed.",
    });
  }
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(
    `MedFlow backend running on http://localhost:${PORT}`
  );
});