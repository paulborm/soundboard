const path = require("path");
const express = require("express");
const router = express.Router();

router.use("/", (_req, res) => {
  res.sendFile("public/index.html", { root: path.dirname(__dirname) });
});

module.exports = router;
