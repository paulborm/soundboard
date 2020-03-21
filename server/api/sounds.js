const path = require("path");
const express = require("express");
const router = express.Router();

const data = [
  {
    id: "boing",
    name: "Boing",
    fileName: "boing.mp3",
    path: path.join(__dirname, "/public/sounds/boing.mp3")
  },
  {
    id: "fuck",
    name: "Fuck",
    fileName: "fuck.mp3",
    path: path.join(__dirname, "/public/sounds/fuck.mp3")
  }
];

router.get("/", (_req, res) => res.status(200).json(data));

router.get("/:id", (req, res) => {
  const found = data.find(item => item.id === req.params.id);

  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
