const express = require("express");
const router = express.Router();

const { add_new_item } = require("./controller");

router.post("/create", add_new_item);
module.exports = router;