const { if_item_stock_exist, add_item_stocks,create_item_stocks_table } = require("./database");
const { res_model } = require("../res.model");

const add_new_item_stocks = (req, res) => {
  const { branch_id, item_id, available_stocks_count, price, user_id } = req.body;
  create_item_stocks_table()
  .then(_ => {
    if_item_stock_exist(branch_id, item_id).then(
      (is_exist) => {
        if (is_exist) {
          res
            .status(200)
            .send(new res_model(true, null, `Item stock already added`));
        } else {
          add_item_stocks(branch_id, item_id, available_stocks_count, price, user_id)
            .then((_) => {
              res
                .status(200)
                .send(
                  new res_model(true, null, "Item stock successfully addedd")
                );
            })
            .catch((err) => {
              res.status(500).send(new res_model(false, err, `Error adding item stock`));
            });
        }
      }
    );
  })

};

module.exports = {
  add_new_item_stocks,
};
