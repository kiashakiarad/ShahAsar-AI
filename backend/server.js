const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

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

    res.json({
      reply: result.data.choices[0].message.content
    });

  } catch (err) {
    console.log(err?.response?.data || err.message);

    res.json({
      reply: "❌ خطا در AI"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running");
});