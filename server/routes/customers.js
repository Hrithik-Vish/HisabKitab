const express = require("express");
const router = express.Router();
const supabase = require("../supabase");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, async (req, res) => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post("/", verifyToken, async (req, res) => {
  const { name, phone } = req.body;
  const { data, error } = await supabase
    .from("customers")
    .insert([{ user_id: req.user.id, name, phone }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

module.exports = router;