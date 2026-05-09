# 📱 HisabKitab — AI-Powered Business Helper for Micro-Entrepreneurs

---

## 🚩 Problem Statement

India has more than **60 million micro-entrepreneurs** — including tiffin providers, tutors, tailors, and shopkeepers — who still manage their businesses using **WhatsApp chats, notebooks, or memory**.

This creates multiple challenges:

* Orders get lost in long WhatsApp message threads.
* Payments are forgotten or delayed due to a lack of tracking.
* No formal records → no access to loans or credit.
* Limited growth due to a lack of insights and modern tools.

---

## 💡 Solution

**HisabKitab** is a simple, **clean web dashboard** that integrates seamlessly with entrepreneurs’ existing habits (like WhatsApp) and makes business management efficient.

### Core MVP Features (Built & Working)

* **Centralized Dashboard** → Track orders, payments, pending dues, and inventory in one place.
* **1-Click WhatsApp Reminders** → Generate and send polite, pre-drafted payment reminders instantly via WhatsApp links or the Twilio API.
* **AI-Powered Restocking & Insights** → Uses Google Gemini AI to analyze current inventory and order history, providing smart restocking thresholds and actionable business tips.

### Future Features

* **Marketing Toolkit** → Auto-generate promotional posters and social media messages.
* **Loan Eligibility Score** → Translate reliable digital ledger records into a credit indicator to unlock financial growth opportunities.

---

## 👥 Target Users

* Tiffin providers 🍲
* Tailors / Boutique workers 🧵
* Tutors and coaching centers 📚
* Kirana / Fruit sellers 🧺
* Freelancers (electricians, plumbers, carpenters) 🛠

---

## 📊 Revenue Model

* **Freemium** → Basic ledger and tracking features are free.
* **Premium Subscription** → ₹100–200/month for advanced AI analytics and marketing tools.
* **Fintech Partnerships** → Commission from micro-loan referrals based on ledger scores.

---

## 🧑‍💻 Actual Code Snippets from Our Project

### 1. Smart WhatsApp Reminder Generator (Node.js)

Instead of typing messages manually, our backend dynamically generates pre-filled WhatsApp links based on customer dues.

```javascript
// From our server/routes/whatsapp.js
function buildReminderMessage({ customerName, amount }) {
  return [
    `Hello ${customerName}!`,
    "This is a reminder from HisabKitab.",
    `You have a pending payment of Rs.${amount}.`,
    "Please clear it at your earliest convenience. Thank you!"
  ].join("\n");
}

router.post("/send", (req, res) => {
  const { customerName, phone, amount } = req.body;
  const cleanPhone = String(phone).replace(/\D/g, "");
  const body = buildReminderMessage({ customerName, amount });
  
  // Generates a direct 1-click WhatsApp messaging link
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(body)}`;
  
  res.json({ success: true, url });
});

```

### 2. AI Inventory Restock Alerts (Google Gemini API)

We use Google's Gemini 2.5 Flash model to analyze current database stock and give human-readable restocking advice.

```javascript
// From our server/routes/ai.js
router.post("/restock", async (req, res) => {
    const { inventory } = req.body;
    const prompt = `
      You are a stock management assistant for a small Indian business.
      Here is the current inventory: ${JSON.stringify(inventory)}
      Suggest how much to restock each low item.
      Format as JSON: { "suggestions": [...] }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    
    // Clean and parse the AI's JSON response to update the frontend
    const clean = result.response.text().replace(/```json|```/g, "").trim();
    res.json(JSON.parse(clean));
});

```

---

## 🛠 Tech Stack

* **Frontend**: React.js (Vite) with custom CSS for a premium dark-theme UI.
* **Backend**: Node.js with Express framework.
* **Database**: Supabase (PostgreSQL) for secure, real-time data storage.
* **AI Integration**: `@google/generative-ai` (Gemini API).
* **Messaging Integration**: Twilio WhatsApp API.
* **Deployment Strategy**: Localhost dual-server environment for demo stability.

---

## 🚀 Roadmap (Hackathon MVP Achieved)

1. ✅ Built a clean, React-based web dashboard.
2. ✅ Integrated Supabase for real-time customer and order tracking.
3. ✅ Implemented 1-click WhatsApp payment reminders.
4. ✅ Hooked up Google Gemini for smart business insights and inventory alerts.

---

## 🎯 Hackathon Focus: HackArena 2.0 Zonals Mumbai

At **HackArena 2.0 Zonals Mumbai**, HisabKitab focuses on leveraging **GenAI** and standard messaging platforms to empower micro-entrepreneurs. By simplifying ledger tracking and directly integrating with **WhatsApp**, we deliver a practical, scalable solution that fits perfectly into the existing habits of Indian small business owners.

---

## 📞 Contact & Contribution

For questions, suggestions, or contributions:

📧 Email: hisabkitab.ai@gmail.com

🌐 GitHub: [https://github.com/Hrithik-Vish/HisabKitab](https://github.com/Hrithik-Vish/HisabKitab)

---

## 📜 License

This project is licensed under the **MIT License**.
