# 📱 HisabKitab — AI-Powered Business Helper for Micro-Entrepreneurs

---

## 🚩 Problem Statement
India has more than **60 million micro-entrepreneurs** — including tiffin providers, tutors, tailors, and shopkeepers — who still manage their businesses using **WhatsApp chats, notebooks, or memory**.  

This creates multiple challenges:
- Orders get lost in long WhatsApp message threads.  
- Payments are forgotten or delayed due to lack of tracking.  
- No formal records → no access to loans or credit.  
- Limited growth due to lack of insights and tools.  

---

## 💡 Solution
**HisabKitab** is a simple, **mobile-first AI assistant** that integrates seamlessly with entrepreneurs’ existing habits (WhatsApp + offline work) and makes business management efficient.  

### Core MVP Features
- **Dashboard** → Track orders, payments, and inventory in one place.  
- **1-Click WhatsApp Reminders** → Send polite, pre-drafted payment reminders instantly.  
- **Smart Restocking Suggestions** → AI/rule-based alerts for inventory management.  
- **Offline-First** → Works without internet, syncs automatically when online.  

### Future Features
- **AI-powered Insights** → Sales trends, festive demand predictions.  
- **Marketing Toolkit** → Auto-generate posters and WhatsApp/social media messages.  
- **Loan Eligibility Score** → Unlock financial growth opportunities.  

---

## 👥 Target Users
- Tiffin providers 🍲  
- Tailors / Boutique workers 🧵  
- Tutors and coaching centers 📚  
- Kirana / Fruit sellers 🧺  
- Freelancers (electricians, plumbers, carpenters) 🛠  

---

## 📊 Revenue Model
- **Freemium** → Basic features free.  
- **Premium Subscription** → ₹100–200/month for analytics, AI tools, and loan support.  
- **Fintech Partnerships** → Commission from micro-loan referrals.  

---

## 🖼 Mockup/Wireframe (Example)
 (https://drive.google.com/file/d/1FIpvVc9s6LS17CIUDM6RElw_f5HUrkRl/view?usp=sharing)

---

## 🧑‍💻 Example Code Snippets

### 1. WhatsApp Reminder (Node.js with Twilio API)
```javascript
const accountSid = "your_twilio_sid";
const authToken = "your_twilio_token";
const client = require("twilio")(accountSid, authToken);

client.messages.create({
  from: "whatsapp:+14155238886",   // Twilio WhatsApp sandbox number
  to: "whatsapp:+9198xxxxxxx",    // Customer's WhatsApp number
  body: "Hello! This is a reminder to clear your pending payment. - HisabKitab"
}).then(message => console.log("Reminder sent:", message.sid))
  .catch(error => console.error("Failed to send reminder:", error));
```

### 2. Inventory Restock Alert (Python)
```python
inventory = {"Rice": 2, "Flour": 0, "Oil": 1}
threshold = 1

for item, qty in inventory.items():
    if qty <= threshold:
        print(f"⚠️ Restock Alert: {item} is running low!")
```

---

## 🛠 Tech Stack
- **Frontend**: React Native / Flutter (cross-platform mobile apps)  
- **Backend**: Node.js with Express (API & business logic)  
- **Database**: SQLite / Realm (offline-first local storage)  
- **Messaging**: Twilio WhatsApp API (send reminders)  
- **AI**: Python (forecasting models, personalization)  
- **Syncing**: Background sync for offline-online consistency  

---

## 🚀 Roadmap (Hackathon MVP)
1. Build a simple mobile dashboard.  
2. Implement WhatsApp reminder integration.  
3. Add rule-based restocking alerts.  
4. Prepare mockups for premium AI features.  

---

## 🎯 Hackathon Focus: MumbaiHacks
At **MumbaiHacks**, HisabKitab focuses on leveraging AI to empower micro-entrepreneurs by simplifying **order/payment tracking**, enabling **offline-first usage**, and directly integrating with **WhatsApp** — delivering a practical, scalable solution.  

---

## 📞 Contact & Contribution
For questions, suggestions, or contributions:  
📧 Email: hisabkitab.ai@gmail.com 
🌐 GitHub: [https://github.com/Hrithik-Vish/HisabKitab](https://github.com/Hrithik-Vish/HisabKitab)


---

## 📜 License
This project is licensed under the **MIT License**.
