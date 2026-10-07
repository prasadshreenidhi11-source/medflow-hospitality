import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Apple,
  Activity,
} from "lucide-react";

import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem(
    "medflow_authenticated",
    "true"
  );

  localStorage.setItem(
    "medflow_user",
    JSON.stringify({
      email: formData.email,
    })
  );

  window.location.href = "/";
};

  return (
    <div className="auth-page">

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
            Smarter care.
            <br />
            <span>Better connected.</span>
          </h1>

          <p>
            Manage patients, appointments, doctors,
            and hospital operations from one
            intelligent workspace.
          </p>

        </div>

        <div className="auth-brand-footer">
          Secure healthcare management platform
        </div>

      </div>


      {/* Right login section */}

      <div className="auth-form-panel">

        <div className="auth-form-container">

          <div className="auth-mobile-brand">

            <div className="auth-brand-icon">
              <Activity size={20} />
            </div>

            <span>MedFlow</span>

          </div>


          <div className="auth-heading">

            <h2>Welcome back</h2>

            <p>
              Sign in to continue to your dashboard.
            </p>

          </div>


          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* Email */}

            <div className="auth-field">

              <label htmlFor="email">
                Email address
              </label>

              <div className="auth-input-wrapper">

                <Mail size={17} />

                <input
                  id="email"
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

              <div className="auth-label-row">

                <label htmlFor="password">
                  Password
                </label>

                <a href="/forgot-password">
                  Forgot password?
                </a>

              </div>

              <div className="auth-input-wrapper">

                <Lock size={17} />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
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
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
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


            {/* Login button */}

            <button
              type="submit"
              className="auth-submit-btn"
            >
              Sign in
              <ArrowRight size={17} />
            </button>

          </form>


          {/* Divider */}

          <div className="auth-divider">
            <span></span>
            <p>or continue with</p>
            <span></span>
          </div>


          {/* Social login */}

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


          {/* Signup */}

          <p className="auth-switch">

            Don't have an account?

            <a href="/signup">
              Create account
            </a>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;