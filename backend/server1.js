const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// تست سرور
app.get("/", (req, res) => {
  res.send("ShahAsar AI Backend is running 🚀");
});

// MOCK AI (بدون OpenAI)
app.post("/chat", (req, res) => {
  const message = req.body.message;

  let reply = "";

  if (message.includes("سلام")) {
    reply = "سلام 👋 خوش اومدی به ShahAsar AI";
  } 
  else if (message.includes("اسم")) {
    reply = "اسم من ShahAsar AI هست 🤖";
  } 
  else if (message.includes("چی هستی")) {
    reply = "من یک هوش مصنوعی تستی هستم 🚀";
  } 
  else {
    reply = "گرفتم 👌: " + message;
  }

  res.json({ reply });
});

// اجرا
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});