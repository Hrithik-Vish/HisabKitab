const express = require("express");
const router = express.Router();
const supabase = require("../supabase");
const verifyToken = require("../middleware/verifyToken");

// GET /api/inventory (Get all inventory for the logged-in user)
router.get("/", verifyToken, async (req, res) => {
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /api/inventory/alerts (Get ONLY items that are low on stock)
router.get("/alerts", verifyToken, async (req, res) => {
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("user_id", req.user.id)
    .lte("quantity", supabase.raw("threshold")); // 'lte' means Less Than or Equal to

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /api/inventory (Add a new item)
router.post("/", verifyToken, async (req, res) => {
  const { item_name, quantity, threshold, unit } = req.body;
  const { data, error } = await supabase
    .from("inventory")
    .insert([{ user_id: req.user.id, item_name, quantity, threshold, unit }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// PATCH /api/inventory/:id (Update quantity when stock arrives or is used)
router.patch("/:id", verifyToken, async (req, res) => {
  const { quantity } = req.body;
  const { data, error } = await supabase
    .from("inventory")
    .update({ quantity, updated_at: new Date() })
    .eq("id", req.params.id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

module.exports = router;