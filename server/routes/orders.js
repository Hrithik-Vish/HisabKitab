const express = require("express");
const router = express.Router();
const supabase = require("../supabase");
const verifyToken = require("../middleware/verifyToken"); // The gatekeeper

// GET /api/orders (Fetch all orders for the logged-in user)
router.get("/", verifyToken, async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, customers(name, phone)") // Supabase does the SQL JOIN automatically here!
    .eq("user_id", req.user.id)
    .order("order_date", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /api/orders (Create a new order)
router.post("/", verifyToken, async (req, res) => {
  const { customer_id, description, amount } = req.body;
  const { data, error } = await supabase
    .from("orders")
    .insert([{ user_id: req.user.id, customer_id, description, amount }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// PATCH /api/orders/:id/status (Mark an order as 'paid' or 'cancelled')
router.patch("/:id/status", verifyToken, async (req, res) => {
  const { status } = req.body;
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", req.params.id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

module.exports = router;