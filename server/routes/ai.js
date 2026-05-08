const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

// POST /api/ai/insight
// sends fake order data to Gemini and returns 2 business tips
router.post("/insight", async (req, res) => {
  try {
    const { orders, inventory } = req.body;

    const prompt = `
      You are a business advisor for small Indian micro-entrepreneurs.
      Here is the business data:
      Orders: ${JSON.stringify(orders)}
      Inventory: ${JSON.stringify(inventory)}

      Give exactly 2 short, practical, specific business tips in simple English.
      Each tip should be 1-2 sentences max.
      Format your response as JSON like this:
      { "tips": ["tip 1 here", "tip 2 here"] }
      Return only JSON, no extra text.
    `;

    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    res.json(parsed);
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "AI insight failed" });
  }
});

// POST /api/ai/restock
// tells you what inventory items need restocking
router.post("/restock", async (req, res) => {
  try {
    const { inventory } = req.body;

    const prompt = `
      You are a stock management assistant for a small Indian business.
      Here is the current inventory: ${JSON.stringify(inventory)}
      
      Look at items where quantity is less than or equal to threshold.
      Suggest how much to restock each low item.
      Format as JSON:
      { "suggestions": [{ "item": "item name", "currentQty": 0, "suggestedRestock": 10, "reason": "short reason" }] }
      Return only JSON, no extra text.
    `;

    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    res.json(parsed);
  } catch (err) {
    console.error("Gemini restock error:", err);
    res.status(500).json({ error: "Restock suggestion failed" });
  }
});

module.exports = router;