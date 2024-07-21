// server/server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5001;

// 静的ファイルを提供
app.use("/audio", express.static(path.join(__dirname, "audio")));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
