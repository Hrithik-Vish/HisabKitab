import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#161b22",
        borderRight: "1px solid #30363d",
        color: "white",
        padding: "30px 20px",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* LOGO + TITLE */}

      <div
        style={{
          marginBottom: "50px",
          textAlign: "center",
        }}
      >
        <img
          src={logo}
          alt="HisabKitab Logo"
          style={{
            width: "120px",
            borderRadius: "12px",
            marginBottom: "15px",
          }}
        />

        <h1
          style={{
            color: "#58a6ff",
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          HisabKitab
        </h1>
      </div>

      {/* NAVIGATION LINKS */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          fontSize: "20px",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/orders"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Orders
        </Link>

        <Link
          to="/inventory"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Inventory
        </Link>

        <Link
          to="/customers"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Customers
        </Link>
      </div>

      {/* LOGOUT BUTTON */}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          padding: "14px",
          backgroundColor: "crimson",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;