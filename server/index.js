const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// routes Hrithik will update


// app.use("/api/ai", require("./routes/ai"));
// app.use("/api/whatsapp", require("./routes/whatsapp"));
// app.use("/api/customers", require("./routes/customers"));
// app.use("/api/payments", require("./routes/payments"));

// test route
app.get("/", (req, res) => res.send("HisabKitab server running ✅"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));