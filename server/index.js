const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

// Middleware: Open CORS to allow your Vercel React frontend to connect
app.use(cors()); 
app.use(express.json());

// Health Check: Shows this message when Vercel successfully deploys
app.get("/", (req, res) => res.send("HisabKitab Backend is Live! ✅"));

// Core CRUD Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/payments", require("./routes/payments"));

// AI & WhatsApp Routes
app.use("/api/ai", require("./routes/ai"));
app.use("/api/whatsapp", require("./routes/whatsapp"));

// ==========================================
// VERCEL SERVERLESS EXPORT
// ==========================================
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Local server running on port ${PORT}`));
}

module.exports = app;