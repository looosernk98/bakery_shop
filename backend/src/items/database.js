const pool = require("../../database");

const if_item_exist = (name) =>
  new Promise((res, rej) => {
    pool
      .query(`SELECT * FROM items where name='${name}'`)
      .then(({ rows }) => {
        //pool.end();
        res(Boolean(rows.length));
      })
      .catch((err) => {
        rej(err);
        //pool.end();
      });
  });

const create_item = (name, user_id) =>
  new Promise((res, rej) => {
      pool
        .query(`INSERT INTO items(name, user_id) VALUES ('${name}','${user_id}')`)
        .then((_) => {
          //pool.end();
          res(true);
        })
        .catch((err) => {
          //pool.end();
          rej(err);
        });
  });

const create_table = () =>
  new Promise((res, rej) => {
    pool
      .query(
        `CREATE TABLE IF NOT EXISTS items(
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
          user_id uuid NOT NULL,
          name VARCHAR NOT NULL
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
  if_item_exist,
  create_item,
  create_table
};
