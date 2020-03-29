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
  },
  {
    id: "Xas5LXkwR76n10c5ti29no",
    name: "Alle",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/alle.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/alle.jpg`
    }
  },
  {
    id: "bq9l6f0s23BhPaigv4Czq73H",
    name: "Bullshit",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/bullshit.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/bullshit.jpg`
    }
  },
  {
    id: "Nokm40k19fjM95MEd9an8afn",
    name: "Flex",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/flex.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/flex.jpg`
    }
  },
  {
    id: "Hfzc1FW3ba3nzhp6sY9b536d",
    name: "Mhmm",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/mhmm.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/mhmm.jpg`
    }
  },
  {
    id: "364kPi89uqmPq40Va5xdfaEw",
    name: "Mhmm 2",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/mhmm-2.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/mhmm-2.jpg`
    }
  },
  {
    id: "8778tTvpZnb7yqZg7ws3W5al",
    name: "Windows Error",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/windows-xp-error.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/windows.jpg`
    }
  },
  {
    id: "RRF8ysfsNRQPGpequtwq7RBm",
    name: "ba dum tss",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/ba-dum-tss.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/ba-dum-tss.png`
    }
  },
  {
    id: "2n3bZaZNNJDZXpbLEtwBapx8",
    name: "DAMN",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/damn.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/damn.jpg`
    }
  },
  {
    id: "E34P6HaM2zeKZDBynCQbK2Zd",
    name: "ohhhhhh",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/ohhhhhh.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/ohhhhhh.jpg`
    }
  },
  {
    id: "BAa7BTpwBqmTPzUqKwaZywnP",
    name: "WOW",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/wow.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/wow.webp`
    }
  },
  {
    id: "GfPVegp3FdaeXrmjfzu87HNs",
    name: "Fake news",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/you-are-fake-news.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/you-are-fake-news.jpg`
    }
  },
  {
    id: "xaXanTX2f5En8QQ8HUVp2UmG",
    name: "Noice",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/noice.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/noice.jpg`
    }
  },
  {
    id: "ErhdWH8gkGRscgs9Lz3MU9qN",
    name: "doot",
    audio: {
      src: `${process.env.BASE_URL}/static/sounds/doot.mp3`
    },
    image: {
      alt: "",
      src: `${process.env.BASE_URL}/static/images/doot.jpg`
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
