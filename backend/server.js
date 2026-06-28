const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// تست سرور
app.get("/", (req, res) => {
  res.send("OK");
});

// ping
app.get("/ping", (req, res) => {
  res.send("pong");
});

// CHAT AI (اصلی)
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.json({ reply: "پیام خالیه" });
    }

    const result = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = result.data.choices[0].message.content;

    return res.json({ reply });

  } catch (err) {
    console.log("ERROR:", err?.response?.data || err.message);

    return res.json({
      reply: "❌ خطا در اتصال به AI"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});