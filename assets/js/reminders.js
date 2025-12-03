function sendReminder(){
  const num = document.getElementById("waNumber").value;
  const msg = document.getElementById("waMsg").value;

  alert("✅ Reminder Triggered!\nNumber: " + num + "\nMessage: " + msg);

  document.getElementById("waNumber").value = "";
  document.getElementById("waMsg").value = "";
}
console.log("Twilio WhatsApp reminder API will be connected here later ✅");

// This file is prepared for backend API integration
// When backend is ready, replace alert() with real API call
