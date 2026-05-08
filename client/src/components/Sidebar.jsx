import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "D" },
  { to: "/orders", label: "Orders", icon: "O" },
  { to: "/inventory", label: "Inventory", icon: "I" },
  { to: "/customers", label: "Customers", icon: "C" },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src={logo} alt="HisabKitab Logo" />

        <div>
          <div className="sidebar-title">HisabKitab</div>
          <div className="sidebar-subtitle">Smart ledger</div>
        </div>
      </div>

      <nav className="nav-list">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="mini-panel">
          <strong>Demo ready</strong>
          <span>Orders, stock, reminders and Gemini insights.</span>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-danger"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
