const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ShahAsar AI Backend is running 🚀");
});

app.post("/chat", (req, res) => {
  const message = req.body.message || "";

  let reply = "";

  if (message.includes("سلام")) {
    reply = "سلام 👋";
  } else {
    reply = "گرفتم 👌: " + message;
  }

  res.json({ reply });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});