const express = require("express");
const router = express.Router();

const data = [
  {
    id: "boing",
    name: "Boing",
    fileName: "boing.mp3",
    path: `${process.env.BASE_URL}/static/sounds/boing.mp3`,
    thumbnail: {
      fileName: "thumbnail-boing.jpg",
      path: `${process.env.BASE_URL}/static/images/thumbnail-cage-01.jpg`
    }
  },
  {
    id: "fuck",
    name: "Fuck",
    fileName: "fuck.mp3",
    path: `${process.env.BASE_URL}/static/sounds/fuck.mp3`,
    thumbnail: {
      fileName: "thumbnail-boing.jpg",
      path: `${process.env.BASE_URL}/static/images/thumbnail-cage-02.jpg`
    }
  }
];

router.get("/", (_req, res) => {
  res.status(200).json(data);
});

router.get("/:id", (req, res) => {
  const found = data.find(item => item.id === req.params.id);

  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
