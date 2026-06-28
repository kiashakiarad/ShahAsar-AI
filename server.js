const express = require("express");
const cors = require("cors");

const app = express();

// CORS باز برای GitHub Pages
app.use(cors({ origin: "*" }));

// جلوگیری از گیر کردن request
app.use(express.json({ limit: "1mb" }));

// سلامت سرور (خیلی مهم)
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// برای UptimeRobot
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

// چت پایدار (بدون async/AI سنگین)
app.post("/chat", (req, res) => {
  try {
    const message = (req.body.message || "").toString();

    if (!message.trim()) {
      return res.json({ reply: "پیام خالیه 🤖" });
    }

    let reply = "";

    if (message.includes("سلام")) {
      reply = "سلام 👋 خوش اومدی";
    } else if (message.includes("چطوری")) {
      reply = "من خوبم 😄 تو چطوری؟";
    } else {
      reply = "گرفتم 👌: " + message;
    }

    res.json({ reply });
  } catch (e) {
    res.status(500).json({ reply: "خطا در سرور ❌" });
  }
});

// مهم: bind برای Render/VPS
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});