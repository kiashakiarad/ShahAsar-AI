const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.post("/chat", (req, res) => {
  res.json({ reply: "ok" });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});