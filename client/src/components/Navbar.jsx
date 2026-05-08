import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ padding: "20px", background: "#222" }}>
      <Link to="/" style={{ color: "white", marginRight: "20px" }}>
        Login
      </Link>

      <Link to="/dashboard" style={{ color: "white", marginRight: "20px" }}>
        Dashboard
      </Link>

      <Link to="/orders" style={{ color: "white", marginRight: "20px" }}>
        Orders
      </Link>

      <Link to="/inventory" style={{ color: "white", marginRight: "20px" }}>
        Inventory
      </Link>

      <Link to="/customers" style={{ color: "white" }}>
        Customers
      </Link>
    </div>
  );
}

export default Navbar;