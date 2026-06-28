const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🟢 تست اینکه سرور زنده است
app.get("/", (req, res) => {
  res.send("ShahAsar AI Backend is running 🚀");
});

// 🟢 Ping برای جلوگیری از Sleep شدن روی Render
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

// 🟢 Chat API
app.post("/chat", (req, res) => {
  try {
    const message = (req.body.message || "").trim();

    let reply = "";

    if (message.includes("سلام")) {
      reply = "سلام 👋 خوش اومدی";
    } else if (message.length === 0) {
      reply = "یه چیزی بنویس 🙂";
    } else {
      reply = "گرفتم 👌: " + message;
    }

    res.json({ reply });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🟢 مهم برای Render
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});