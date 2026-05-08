import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import logo from "../assets/logo.png";

function Register() {
  const [form, setForm] = useState({
    name: "",
    business_name: "",
    business_type: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const updateField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleRegister = async () => {
    const missingField = Object.values(form).some(
      (value) => !value
    );

    if (missingField) {
      alert("Please fill all registration details");
      return;
    }

    if (form.password.length < 6) {
      alert("Password should be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await API.post("/auth/register", form);
      alert("Registration successful. Please login.");
      navigate("/");
    } catch (error) {
      console.log(
        "Register error:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.error ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="login-shell register-shell">
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
            <p className="eyebrow">Start your digital ledger</p>
            <h1>Set up your shop profile in under a minute.</h1>
            <p>
              Register your business, then manage orders,
              customers, stock and AI suggestions from one dashboard.
            </p>
          </div>
        </div>

        <div className="login-card">
          <div>
            <p className="eyebrow">Create account</p>
            <h2>Business registration</h2>
            <p>
              These details help personalize your HisabKitab workspace.
            </p>
          </div>

          <div className="auth-grid">
            <input
              className="input"
              type="text"
              placeholder="Owner name"
              value={form.name}
              onChange={(e) =>
                updateField("name", e.target.value)
              }
            />

            <input
              className="input"
              type="text"
              placeholder="Business name"
              value={form.business_name}
              onChange={(e) =>
                updateField(
                  "business_name",
                  e.target.value
                )
              }
            />

            <input
              className="input"
              type="text"
              placeholder="Business type"
              value={form.business_type}
              onChange={(e) =>
                updateField(
                  "business_type",
                  e.target.value
                )
              }
            />

            <input
              className="input"
              type="text"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) =>
                updateField("phone", e.target.value)
              }
            />

            <input
              className="input"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                updateField("email", e.target.value)
              }
            />

            <input
              className="input"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                updateField("password", e.target.value)
              }
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="auth-switch">
            Already registered? <Link to="/">Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
