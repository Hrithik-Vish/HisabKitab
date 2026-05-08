const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json());

// Core CRUD Routes (Member 2 - Hrithik)
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/orders", require("./routes/orders"));
// app.use("/api/inventory", require("./routes/inventory"));
// app.use("/api/customers", require("./routes/customers"));
// app.use("/api/payments", require("./routes/payments"));

// AI & WhatsApp Routes (Member 3 - Shreyas)
app.use("/api/ai", require("./routes/ai"));
app.use("/api/whatsapp", require("./routes/whatsapp"));

// Health check endpoint
app.get("/", (req, res) => res.send("HisabKitab server running with Supabase ✅"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
