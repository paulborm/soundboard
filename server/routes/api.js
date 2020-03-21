const express = require("express");
const router = express.Router();

router.use("/sounds", require("../api/sounds"));

module.exports = router;
