const express = require("express");
const router = express.Router();

const data = [
  {
    id: "Rb3vNLwuv6410bled1n9P0qm",
    name: "Fuck",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/fuck.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/puppy.jpg`
    }
  },
  {
    id: "61w3P9vmsdiBgwd7865dqEoP",
    name: "Ha Ha",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/ostrich-laugh.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/ostrich.jpg`
    }
  },
  {
    id: "0e2q7Ou27bPkti6kMp5l2Ird",
    name: "Alles bleibt wie es ist",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/alles-bleibt-wie-es-ist.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/andreas.jpg`
    }
  },
  {
    id: "bJ8pBvdC2oxz028t1ua5mw0W",
    name: "NEIN NEIN NEIN",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/nein-nein-nein.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/hitler.jpg`
    }
  },
  {
    id: "j5rycgGx7j67Z64xykh2w6JT",
    name: "Kannst kotzen gehen",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/kannst-kotzen-gehen.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/sasha.jpg`
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
