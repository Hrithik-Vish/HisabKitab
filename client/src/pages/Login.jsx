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

      console.log(
        "Backend response:",
        response.data
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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #0d1117, #161b22)",
        color: "white",
      }}
    >
      <div
        style={{
          backgroundColor: "#161b22",
          border: "1px solid #30363d",
          padding: "40px",
          borderRadius: "16px",
          width: "400px",
          textAlign: "center",
          boxShadow: "0 0 25px rgba(0,0,0,0.4)",
        }}
      >
        {/* LOGO */}

        <img
          src={logo}
          alt="HisabKitab Logo"
          style={{
            width: "120px",
            marginBottom: "20px",
            borderRadius: "16px",
          }}
        />

        <h1
          style={{
            marginBottom: "10px",
            color: "#58a6ff",
          }}
        >
          HisabKitab
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
          }}
        >
          AI-Powered Business Helper
        </p>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #30363d",
            backgroundColor: "#0d1117",
            color: "white",
            fontSize: "16px",
          }}
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "25px",
            borderRadius: "10px",
            border: "1px solid #30363d",
            backgroundColor: "#0d1117",
            color: "white",
            fontSize: "16px",
          }}
        />

        {/* LOGIN BUTTON */}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#238636",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Login
        </button>

        {/* DEMO TEXT */}

        <p
          style={{
            marginTop: "20px",
            color: "#888",
            fontSize: "14px",
          }}
        >
          Built for HackArena 🚀
        </p>
      </div>
    </div>
  );
}

export default Login;