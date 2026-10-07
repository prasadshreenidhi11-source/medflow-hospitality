import { useState } from "react";
import {
  UserRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Apple,
  Activity,
  Check,
} from "lucide-react";

import "./Signup.css";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

 const handleSubmit = async (event) => {
  console.log("🔥 SIGNUP BUTTON CLICKED");

  event.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  console.log("🔥 Passwords match");
  console.log("🔥 Sending request to backend...");

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    console.log("🔥 Backend responded:", response.status);

    const data = await response.json();

    console.log("🔥 Backend data:", data);

    if (!response.ok) {
      alert(data.message || "Signup failed.");
      return;
    }

    alert("Account created successfully!");

    window.location.href = "/login";
  } catch (error) {
    console.error("🔥 Signup error:", error);

    alert(
      "Unable to connect to the server. Please try again."
    );
  }
};

  return (
    <div className="auth-page signup-page">

      {/* Left branding section */}

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
            Your hospital.
            <br />
            <span>One connected system.</span>
          </h1>

          <p>
            Create your account and bring patients,
            doctors, appointments, and daily hospital
            operations into one workspace.
          </p>

          <div className="signup-benefits">

            <div className="signup-benefit">
              <div>
                <Check size={13} />
              </div>
              Patient management
            </div>

            <div className="signup-benefit">
              <div>
                <Check size={13} />
              </div>
              Appointment scheduling
            </div>

            <div className="signup-benefit">
              <div>
                <Check size={13} />
              </div>
              Doctor management
            </div>

          </div>

        </div>

        <div className="auth-brand-footer">
          Secure healthcare management platform
        </div>

      </div>


      {/* Signup form */}

      <div className="auth-form-panel">

        <div className="auth-form-container">

          {/* Mobile brand */}

          <div className="auth-mobile-brand">

            <div className="auth-brand-icon">
              <Activity size={20} />
            </div>

            <span>MedFlow</span>

          </div>


          {/* Heading */}

          <div className="auth-heading">

            <h2>Create your account</h2>

            <p>
              Get started with your hospital
              management workspace.
            </p>

          </div>


          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* Name */}

            <div className="auth-field">

              <label htmlFor="name">
                Full name
              </label>

              <div className="auth-input-wrapper">

                <UserRound size={17} />

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Email */}

            <div className="auth-field">

              <label htmlFor="signup-email">
                Email address
              </label>

              <div className="auth-input-wrapper">

                <Mail size={17} />

                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Password */}

            <div className="auth-field">

              <label htmlFor="signup-password">
                Password
              </label>

              <div className="auth-input-wrapper">

                <Lock size={17} />

                <input
                  id="signup-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </div>


            {/* Confirm password */}

            <div className="auth-field">

              <label htmlFor="confirm-password">
                Confirm password
              </label>

              <div className="auth-input-wrapper">

                <Lock size={17} />

                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </div>


            {/* Create account */}

            <button
              type="submit"
              className="auth-submit-btn"
            >
              Create account
              <ArrowRight size={17} />
            </button>

          </form>


          {/* Divider */}

          <div className="auth-divider">

            <span></span>

            <p>or continue with</p>

            <span></span>

          </div>


          {/* Social buttons */}

          <div className="auth-social-buttons">

            <button
              type="button"
              className="auth-social-btn"
            >
              <span className="google-icon">G</span>
              Google
            </button>

            <button
              type="button"
              className="auth-social-btn"
            >
              <Apple size={18} />
              Apple
            </button>

          </div>


          {/* Login switch */}

          <p className="auth-switch">

            Already have an account?

            <a href="/login">
              Sign in
            </a>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;