const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || "3001";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log(`a user connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
