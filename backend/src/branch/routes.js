const express = require("express");
const router = express.Router();

const { add_new_branch } = require("./controller");

router.post("/create", add_new_branch);
module.exports = router;
