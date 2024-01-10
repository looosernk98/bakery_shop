const express = require("express");
const router = express.Router();

const {
  add_new_order,
  get_order_data,
  get_top_branches,
  get_all_items_order_stats,
  get_order_by_delivery_state,
} = require("./controller");

router.post("/place_order", add_new_order);
router.get("/get_top_branches", get_top_branches);
router.get("/get_order_data", get_order_data);
router.get("/all_items_order_stats", get_all_items_order_stats);
router.get("/get_order_by_delivery_state", get_order_by_delivery_state);
module.exports = router;
