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

app.get("/ping", (req, res) => {
  res.send("pong");
});

// چت AI
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    // 🔴 اینجا خیلی مهمه
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        reply: "API KEY تنظیم نشده روی سرور",
      });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (err) {
    console.log(err?.response?.data || err.message);

    res.json({
      reply: "❌ خطا در AI",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});