async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  const userText = input.value;
  chatBox.innerHTML += `<div>🧑: ${userText}</div>`;

  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userText }]
    })
  });

  const data = await response.json();

  const aiText = data.choices[0].message.content;

  chatBox.innerHTML += `<div>🤖: ${aiText}</div>`;
}