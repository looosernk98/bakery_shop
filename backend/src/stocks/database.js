const pool = require("../../database");

const if_item_stock_exist = (branch_id, item_id) =>
  new Promise((res, rej) => {
    pool
      .query(
        `SELECT * FROM item_stocks where branch_id='${branch_id}' AND item_id='${item_id}'`
      )
      .then(({ rows }) => {
        //pool.end();
        res(Boolean(rows.length));
      })
      .catch((err) => {
        rej(err);
        //pool.end();
      });
  });

const add_item_stocks = (branch_id, item_id, available_stocks_count, price, user_id) =>
  new Promise((res, rej) => {
    pool
      .query(
        `INSERT INTO item_stocks(branch_id, item_id, available_stocks_count, price, user_id) VALUES ('${branch_id}', '${item_id}', '${available_stocks_count}', '${price}', '${user_id}')`
      )
      .then((_) => {
        //pool.end();
        res(true);
      })
      .catch((err) => {
        //pool.end();
        rej(err);
      });
  });

const create_item_stocks_table = () =>
  new Promise((res, rej) => {
    pool
      .query(
        `CREATE TABLE IF NOT EXISTS item_stocks(
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
          branch_id uuid NOT NULL references branch(id),
          item_id uuid NOT NULL references items(id),
          user_id uuid NOT NULL,
          available_stocks_count VARCHAR NOT NULL,
          price VARCHAR NOT NULL
        )`
      )
      .then((_) => {
        //pool.end();
        res(true);
      })
      .catch((err) => {
        //pool.end();
        rej(err);
      });
  });

module.exports = {
  if_item_stock_exist,
  add_item_stocks,
  create_item_stocks_table
};
