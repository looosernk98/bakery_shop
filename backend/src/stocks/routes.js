const express = require("express");
const router = express.Router();

const { add_new_item_stocks } = require("./controller");

router.post("/add_item", add_new_item_stocks);
module.exports = router;