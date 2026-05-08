const express = require("express");
const router = express.Router();
const supabase = require("../supabase");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, async (req, res) => {
  const { order_id, customer_id, amount_paid, method } = req.body;

  // 1. Insert the payment record
  const { data, error } = await supabase
    .from("payments")
    .insert([{ order_id, customer_id, amount_paid, method }])
    .select();

  if (error) return res.status(500).json({ error: error.message });

  // 2. Fetch the current customer to check their total_due
  const { data: customer } = await supabase
    .from("customers")
    .select("total_due")
    .eq("id", customer_id)
    .single();

  // 3. Calculate new total due (ensure it doesn't go below 0)
  const newDue = Math.max(0, customer.total_due - amount_paid);
  
  // Update the customer record
  await supabase
    .from("customers")
    .update({ total_due: newDue })
    .eq("id", customer_id);

  // 4. Mark the specific order as paid
  await supabase
    .from("orders")
    .update({ status: "paid" })
    .eq("id", order_id);

  res.status(201).json(data[0]);
});

module.exports = router;