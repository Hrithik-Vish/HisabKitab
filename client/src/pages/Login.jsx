import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import logo from "../assets/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(
        "Login error:",
        error.response?.data
      );

      alert("Invalid login credentials");
    }
  };

  return (
    <main className="auth-page">
      <section className="login-shell">
        <div className="login-story">
          <div className="brand-row">
            <img
              src={logo}
              alt="HisabKitab Logo"
              className="brand-logo"
            />
            <div className="brand-name">HisabKitab</div>
          </div>

          <div className="login-copy">
            <p className="eyebrow">AI business helper</p>
            <h1>Run a cleaner shop from one simple screen.</h1>
            <p>
              Track orders, stock, customer dues and AI suggestions
              built for fast-moving Indian micro-businesses.
            </p>
          </div>
        </div>

        <div className="login-card">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h2>Sign in to your ledger</h2>
            <p>
              Your dashboard is ready with live business actions.
            </p>
          </div>

          <input
            className="input"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            className="input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={handleLogin}
            className="btn btn-primary"
          >
            Login
          </button>

          <p className="muted">
            Built for a fast demo: simple, practical and AI-assisted.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
