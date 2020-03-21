require("dotenv").config();
const path = require("path");
const express = require("express");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || "3001";

app.use(cors());

// Serve static files
app.use("/static", express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", require("./routes/api"));
app.use("/", require("./routes/index"));

let state = {
  users: []
};

io.on("connection", socket => {
  console.log(`[EVENT: connection]: ${socket.id}`);

  state = {
    ...state,
    users: [...state.users, socket.id]
  };

  io.emit("user", { amount: state.users.length });

  socket.on("sound", data => {
    console.log("[EVENT: sound]", data.name);
    socket.broadcast.emit("sound", { ...data.sound });

    // Not currently needed. Save for later.
    // Streaming an audio file in chunks to the client.
    //
    // const sound = sounds.filter(({ id }) => id === data.soundId)[0];
    // const audioReadStream = fs.createReadStream(sound.path, {
    //   encoding: "binary",
    //   highWaterMark: 128 * 1024
    // });
    // audioReadStream.on("data", function(chunk) {
    //   console.log(`Streaming sound: ${data.soundId}`);
    //   socket.broadcast.emit("sound", { chunk });
    // });
  });

  socket.on("disconnect", () => {
    console.log(`[EVENT: disconnect]: ${socket.id}`);
    const filteredUsers = state.users.filter(user => user !== socket.id);
    state = {
      ...state,
      users: [...filteredUsers]
    };
    io.emit("user", { amount: state.users.length });
  });
});

// Run server and listen on port: `PORT`
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
