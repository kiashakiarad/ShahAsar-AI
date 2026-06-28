const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// تست سلامت سرور
app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

// چت ساده
app.post("/chat", (req, res) => {
  const message = req.body.message || "";
  res.json({ reply: "AI: " + message });
});

// مهم: Railway / Render هر دو اینو می‌خوان
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});