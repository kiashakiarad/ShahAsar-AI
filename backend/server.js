const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// تست سلامت سرور
app.get("/", (req, res) => {
  res.send("OK");
});

// ping
app.get("/ping", (req, res) => {
  res.send("pong");
});

// چت AI واقعی
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || !message.trim()) {
      return res.json({ reply: "پیام خالیه 🤖" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that answers in Persian."
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content;

    res.json({
      reply: reply || "پاسخی دریافت نشد"
    });

  } catch (err) {
    console.log("ERROR:", err?.response?.data || err.message);

    res.status(500).json({
      reply: "❌ خطا در اتصال به AI"
    });
  }
});

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});