const express = require("express");
const cors = require("cors");

const app = express();

// مهم: CORS کامل
app.use(cors());
app.use(express.json());

// تست سلامت سرور
app.get("/", (req, res) => {
  res.send("ShahAsar AI Backend is running :rocket:");
});

// API چت
app.post("/chat", (req, res) => {
  try {
    const message = req.body.message || "";

    let reply = "";

    if (message.includes("سلام")) {
      reply = "سلام :wave:";
    } else {
      reply = "گرفتم :ok_hand:: " + message;
    }

    res.json({ reply });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// مهم برای Render
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});