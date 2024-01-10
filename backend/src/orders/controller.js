const {
  add_order,
  all_items_order_stats,
  order_by_delivery_state,
  top_branches,
  order_data
} = require("./database");
const { res_model } = require("../res.model");
const { v4: uuidv4 } = require("uuid");
const {
  convert_unix_time_to_postgresql_time_format,
} = require("../../utils/util");

const add_new_order = (req, res) => {
  const { user_id, orders, state } = req.body;
  const order_id = uuidv4();
  add_order(user_id, orders, order_id, state)
    .then((_) => {
      res
        .status(200)
        .send(new res_model(true, { order_id }, "Order placed successfully"));
    })
    .catch((err) => {
      res.status(500).send(new res_model(false, err, "Error placing order"));
    });
};

const get_all_items_order_stats = (req, res) => {
  const { from_time, to_time } = req.query;
  all_items_order_stats(
    convert_unix_time_to_postgresql_time_format(from_time),
    convert_unix_time_to_postgresql_time_format(to_time)
  )
    .then((record) => {
      res
        .status(200)
        .send(
          new res_model(true, record, "Successfully fetched all items stats")
        );
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .send(new res_model(false, err, "Error fetching all items stats"));
    });
};

const get_order_by_delivery_state = (req, res) => {
  const { from_time, to_time } = req.query;
  order_by_delivery_state(
    convert_unix_time_to_postgresql_time_format(from_time),
    convert_unix_time_to_postgresql_time_format(to_time)
  )
    .then((rows) => {
      res.status(200).send(new res_model(true, rows, "Successfully fetched"));
    })
    .catch((err) => {
      res.status(200).send(new res_model(false, err, "Error fetching"));
    });
};

const get_top_branches = (req, res) => {
  const { from_time, to_time } = req.query;
  top_branches(
    convert_unix_time_to_postgresql_time_format(from_time),
    convert_unix_time_to_postgresql_time_format(to_time)
  )
    .then((rows) => {
      res.status(200).send(new res_model(true, rows, "Successfully fetched"));
    })
    .catch((err) => {
      res.status(500).send(new res_model(false, err, "Error fetching data"));
    });
};

const get_order_data = (req, res) => {
  const { from_time, to_time, filter_type, item_id, state} = req.query;
  order_data(from_time, to_time, filter_type, item_id, state)
  .then((data) => {
    res.status(200).send(new res_model(true, data, 'Successfully fetched order data'));
  })
  .catch(err => {
    res.status(500).send(new res_model(false, err, "Error fetching order data"));
  })
}

module.exports = {
  add_new_order,
  get_all_items_order_stats,
  get_order_by_delivery_state,
  get_top_branches,
  get_order_data
};
