const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password, name, business_name, business_type, phone } = req.body;
  try {
    // 1. Create the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    // 2. Store their HisabKitab business details in your public users table
    await supabase.from("users").insert([{
      id: data.user.id,
      email,
      name,
      business_name,
      business_type,
      phone,
      password_hash: "supabase_managed" // Placeholder since Supabase Auth handles the real hash
    }]);

    res.status(201).json({ message: "Registered successfully", user: data.user });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    // Return the session token to the frontend
    res.json({ token: data.session.access_token, user: data.user });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;