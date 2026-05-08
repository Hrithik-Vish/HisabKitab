const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} in server/.env`);
  }

  return value;
}

function getClient() {
  return twilio(
    requiredEnv("TWILIO_SID"),
    requiredEnv("TWILIO_AUTH_TOKEN")
  );
}

function formatWhatsAppNumber(phone) {
  if (!phone) {
    return "";
  }

  const value = String(phone).trim();
  if (value.startsWith("whatsapp:")) {
    return value;
  }

  return `whatsapp:${value}`;
}

function formatWhatsAppLinkNumber(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function buildReminderMessage({ customerName, amount, message }) {
  if (message) {
    return message;
  }

  return [
    `Hello ${customerName}!`,
    "This is a reminder from HisabKitab.",
    `You have a pending payment of Rs.${amount}.`,
    "Please clear it at your earliest convenience.",
    "Thank you!"
  ].join("\n");
}

// POST /api/whatsapp/send
// router.post("/send", async (req, res) => {
//   try {
//     const { customerName, phone, amount, message } = req.body;

//     if (!customerName || !phone || (!amount && !message)) {
//       return res.status(400).json({
//         success: false,
//         error: "customerName, phone, and amount are required unless message is provided"
//       });
//     }

//     const from = formatWhatsAppNumber(requiredEnv("TWILIO_WHATSAPP_FROM"));
//     const to = formatWhatsAppNumber(phone);
//     const body = buildReminderMessage({ customerName, amount, message });
//     const client = getClient();

//     const sentMessage = await client.messages.create({
//       from,
//       to,
//       body
//     });

//     res.json({
//       success: true,
//       sid: sentMessage.sid,
//       status: sentMessage.status,
//       from,
//       to,
//       body,
//       note: "Twilio accepted the message. If it is not received, check /api/whatsapp/status/:sid and make sure the recipient has joined your Twilio WhatsApp sandbox."
//     });
//   } catch (err) {
//     console.error("Twilio error:", err);
//     res.status(err.status || 500).json({
//       success: false,
//       error: "Failed to send WhatsApp message",
//       details: err.message,
//       code: err.code,
//       moreInfo: err.moreInfo
//     });
//   }
// });

// POST /api/whatsapp/link
// Creates a manual WhatsApp link with the reminder message pre-filled.
router.post("/send", (req, res) => {
  const { customerName, phone, amount, message } = req.body;

  if (!customerName || !phone || (!amount && !message)) {
    return res.status(400).json({
      success: false,
      error: "customerName, phone, and amount are required unless message is provided"
    });
  }

  const cleanPhone = formatWhatsAppLinkNumber(phone);

  if (!cleanPhone) {
    return res.status(400).json({
      success: false,
      error: "phone must include country code, for example +918104289653"
    });
  }

  const body = buildReminderMessage({ customerName, amount, message });
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(body)}`;

  res.json({
    success: true,
    phone: cleanPhone,
    body,
    url,
    note: "Open this URL and press Send in WhatsApp. The receiver does not need Twilio Sandbox."
  });
});

// GET /api/whatsapp/status/:sid
router.get("/status/:sid", async (req, res) => {
  try {
    const client = getClient();
    const message = await client.messages(req.params.sid).fetch();

    res.json({
      success: true,
      sid: message.sid,
      status: message.status,
      errorCode: message.errorCode,
      errorMessage: message.errorMessage,
      from: message.from,
      to: message.to,
      dateCreated: message.dateCreated,
      dateSent: message.dateSent
    });
  } catch (err) {
    console.error("Twilio status error:", err);
    res.status(err.status || 500).json({
      success: false,
      error: "Failed to fetch WhatsApp message status",
      details: err.message,
      code: err.code,
      moreInfo: err.moreInfo
    });
  }
});

module.exports = router;
