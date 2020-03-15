const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const fs = require("fs");
const sounds = require("./sounds");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || "3001";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let state = {
  users: []
};

io.on("connection", socket => {
  console.log(`a user connected: ${socket.id}`);

  state = {
    ...state,
    users: [...state.users, socket.id]
  };

  io.emit("user", { amount: state.users.length });

  socket.on("sound", data => {
    console.log("sound", data);
    const sound = sounds.filter(({ id }) => id === data.soundId)[0];
    const audioReadStream = fs.createReadStream(sound.path, {
      encoding: "binary",
      highWaterMark: 128 * 1024
    });

    audioReadStream.on("data", function(chunk) {
      console.log(`Streaming sound: ${data.soundId}`);
      io.emit("sound", { chunk });
    });
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
    const filteredUsers = state.users.filter(user => user !== socket.id);
    state = {
      ...state,
      users: [...filteredUsers]
    };
    io.emit("user", { amount: state.users.length });
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
