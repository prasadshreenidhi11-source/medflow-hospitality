import { useState } from "react";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  Activity,
  CheckCircle2,
} from "lucide-react";

import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetting, setResetting] = useState(false);

  // =====================================================
  // STEP 1 — SEND VERIFICATION CODE
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong.");
        return;
      }

      console.log("Password reset email sent:", data);

      setSubmitted(true);
    } catch (error) {
      console.error("Forgot password error:", error);

      alert(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // STEP 3 — VERIFY CODE
  // =====================================================

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      alert("Please enter the 6-digit verification code.");
      return;
    }

    setVerifying(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-reset-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Invalid verification code."
        );
        return;
      }

      console.log("Code verified:", data);

      setCodeVerified(true);
    } catch (error) {
      console.error("Verify code error:", error);

      alert(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setVerifying(false);
    }
  };

  // =====================================================
  // STEP 4 — RESET PASSWORD
  // =====================================================

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setResetting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to update password."
        );
        return;
      }

      console.log("Password reset:", data);

      alert("Password updated successfully!");

      window.location.href = "/login";
    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      alert(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="auth-page forgot-page">

      {/* =================================================
          LEFT BRANDING
      ================================================= */}

      <div className="auth-brand-panel">

        <div className="auth-brand">

          <div className="auth-brand-icon">
            <Activity size={22} />
          </div>

          <span>MedFlow</span>

        </div>

        <div className="auth-brand-content">

          <span className="auth-eyebrow">
            HOSPITAL MANAGEMENT
          </span>

          <h1>
            Secure access.
            <br />
            <span>Always available.</span>
          </h1>

          <p>
            Reset your password securely and get
            back to managing your hospital workspace.
          </p>

        </div>

        <div className="auth-brand-footer">
          Secure healthcare management platform
        </div>

      </div>


      {/* =================================================
          RIGHT FORM
      ================================================= */}

      <div className="auth-form-panel">

        <div className="auth-form-container">

          {/* Mobile brand */}

          <div className="auth-mobile-brand">

            <div className="auth-brand-icon">
              <Activity size={20} />
            </div>

            <span>MedFlow</span>

          </div>


          {/* =================================================
              STEP 1 — ENTER EMAIL
          ================================================= */}

          {!submitted && !showCode && (

            <>
              <div className="auth-heading">

                <h2>Forgot your password?</h2>

                <p>
                  Enter your email and we'll send you
                  a confirmation code.
                </p>

              </div>


              <form
                className="auth-form"
                onSubmit={handleSubmit}
              >

                <div className="auth-field">

                  <label htmlFor="reset-email">
                    Email address
                  </label>

                  <div className="auth-input-wrapper">

                    <Mail size={17} />

                    <input
                      id="reset-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      required
                    />

                  </div>

                </div>


                <button
                  type="submit"
                  className="auth-submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Sending..."
                    : "Send confirmation code"}

                  {!loading && (
                    <ArrowRight size={17} />
                  )}

                </button>

              </form>


              <a
                href="/login"
                className="forgot-back-link"
              >
                <ArrowLeft size={15} />
                Back to sign in
              </a>

            </>

          )}


          {/* =================================================
              STEP 2 — EMAIL SENT
          ================================================= */}

          {submitted && !showCode && (

            <div className="forgot-success">

              <div className="forgot-success-icon">
                <CheckCircle2 size={28} />
              </div>

              <h2>Check your email</h2>

              <p>
                We've sent a 6-digit confirmation code
                to
                <strong> {email}</strong>.
              </p>


              <button
                type="button"
                className="forgot-success-btn"
                onClick={() => setShowCode(true)}
              >
                Enter confirmation code
                <ArrowRight size={16} />
              </button>

            </div>

          )}


          {/* =================================================
              STEP 3 — ENTER CONFIRMATION CODE
          ================================================= */}

          {submitted &&
            showCode &&
            !codeVerified && (

              <div className="forgot-success">

                <div className="forgot-success-icon">
                  <Mail size={28} />
                </div>


                <div className="auth-heading">

                  <h2>
                    Enter confirmation code
                  </h2>

                  <p>
                    Enter the 6-digit code we sent to
                    <strong> {email}</strong>.
                  </p>

                </div>


                <div className="auth-field">

                  <label htmlFor="verification-code">
                    Confirmation code
                  </label>

                  <div className="auth-input-wrapper">

                    <input
                      id="verification-code"
                      type="text"
                      inputMode="numeric"
                      maxLength="6"
                      placeholder="123456"
                      value={code}
                      onChange={(event) =>
                        setCode(
                          event.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                    />

                  </div>

                </div>


                <button
                  type="button"
                  className="auth-submit-btn"
                  disabled={
                    verifying ||
                    code.length !== 6
                  }
                  onClick={handleVerifyCode}
                >

                  {verifying
                    ? "Verifying..."
                    : "Verify code"}

                  {!verifying && (
                    <ArrowRight size={17} />
                  )}

                </button>


                <button
                  type="button"
                  className="forgot-back-link"
                  onClick={() => {
                    setShowCode(false);
                    setCode("");
                  }}
                >
                  <ArrowLeft size={15} />
                  Back
                </button>

              </div>

            )}


          {/* =================================================
              STEP 4 — CREATE NEW PASSWORD
          ================================================= */}

          {submitted &&
            showCode &&
            codeVerified && (

              <div className="forgot-success">

                <div className="forgot-success-icon">
                  <CheckCircle2 size={28} />
                </div>


                <div className="auth-heading">

                  <h2>Create new password</h2>

                  <p>
                    Your verification code has been
                    confirmed. Create a new password
                    for your account.
                  </p>

                </div>


                {/* NEW PASSWORD */}

                <div className="auth-field">

                  <label htmlFor="new-password">
                    New password
                  </label>

                  <div className="auth-input-wrapper">

                    <input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(event) =>
                        setNewPassword(
                          event.target.value
                        )
                      }
                    />

                  </div>

                </div>


                {/* CONFIRM PASSWORD */}

                <div className="auth-field">

                  <label htmlFor="confirm-password">
                    Confirm new password
                  </label>

                  <div className="auth-input-wrapper">

                    <input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                    />

                  </div>

                </div>


                {/* UPDATE PASSWORD */}

                <button
                  type="button"
                  className="auth-submit-btn"
                  disabled={resetting}
                  onClick={handleResetPassword}
                >

                  {resetting
                    ? "Updating..."
                    : "Update password"}

                  {!resetting && (
                    <ArrowRight size={17} />
                  )}

                </button>


                {/* BACK */}

                <button
                  type="button"
                  className="forgot-back-link"
                  onClick={() => {
                    setCodeVerified(false);
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >

                  <ArrowLeft size={15} />
                  Back

                </button>

              </div>

            )}

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;