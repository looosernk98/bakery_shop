const pool = require("../../database");

const add_order = (user_id, orders, order_id, state) =>
  new Promise((res, rej) => {
    create_orders_table().then((_) => {
      const date = new Date().toISOString();
      let value_to_insert = "";
      for (let i = 0; i < orders?.length; ++i) {
        const { branch_id, item_id, item_count } = orders[i];
        if (i) value_to_insert += ",";
        value_to_insert += `('${user_id}', '${branch_id}', '${order_id}', '${item_count}', '${item_id}', '${
          state ?? "CREATED"
        }','${date}', '${date}', '${user_id}')`;
      }
      pool
        .query(
          `INSERT INTO orders(user_id, branch_id, id, item_count, item_id, state, created_at, updated_at,updated_by) VALUES${value_to_insert};`
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
  });

const create_orders_table = () =>
  new Promise((res, rej) => {
    pool
      .query(
        `CREATE TABLE IF NOT EXISTS orders(
          id uuid NOT NULL,
          user_id uuid NOT NULL,
          branch_id uuid NOT NULL references branch(id),
          item_count BIGINT NOT NULL,
          item_id uuid NOT NULL references items(id),
          state VARCHAR NOT NULL,
          created_at timestamp NOT NULL,
          updated_at timestamp  NOT NULL,
          updated_by uuid NOT NULL
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

const all_items_order_stats = (from_time, to_time) =>
  new Promise((res, rej) => {
    pool
      .query(
        `SELECT 
          SUM(orders.item_count) as total,
          items.name 
          from orders inner join items on (items.id=orders.item_id)
          where orders.created_at >= '${from_time}' AND orders.created_at <= '${to_time}'
          GROUP BY orders.item_id, items.name 
         `
      )
      .then(({ rows }) => {
        res(rows);
      })
      .catch((err) => rej(err));
  });

const order_by_delivery_state = (from_time, to_time) =>
  new Promise((res, rej) => {
    pool
      .query(
        `SELECT state, SUM(item_count) AS orders from orders
        where orders.created_at >= '${from_time}' AND orders.created_at <= '${to_time}'
        group by state`
        )
        .then(({ rows }) => {
        console.log(
          `SELECT state, SUM(item_count) AS orders from orders
        where orders.created_at >= '${from_time}' AND orders.created_at <= '${to_time}'
        group by state`
        );
        res(rows);
        
      })
      .catch((err) => {
        rej(err);
      });
  });

const top_branches = (from_time, to_time) =>
  new Promise((res, rej) => {
    pool
      .query(
        `select branch.name, SUM(orders.item_count) as orders 
      from orders inner join branch on (branch.id=orders.branch_id)
      where orders.created_at >= '${from_time}' AND orders.created_at <= '${to_time}'
      GROUP BY orders.branch_id, branch.name 
      order by orders desc
      limit 5`
      )
      .then(({ rows }) => {
        res(rows);
      })
      .catch((err) => {
        rej(err);
      });
  });

const order_data = (from_time, to_time, filter_type, item_id, state) =>
  new Promise((res, rej) => {
    //Show default month wise data;
    if (
      !(
        filter_type === "day" ||
        filter_type === "week" ||
        filter_type === "hour" ||
        filter_type === "month"
      )
    ) {
      filter_type = "month";
    }
    let order_query = `select sum(item_count) as order, extract(${filter_type} from created_at) as ${filter_type} from orders
                   where orders.created_at >= '${from_time}' AND orders.created_at <= '${to_time}'`;
    let price_query = `select extract (${filter_type} from orders.created_at) as ${filter_type}, SUM(item_stocks.price::bigint) from orders 
                   inner join item_stocks on (orders.branch_id = item_stocks.branch_id and orders.item_id = item_stocks.item_id)
                   where orders.created_at >= '${from_time}' AND orders.created_at <= '${to_time}'`;
    if (item_id) {
      order_query += `AND orders.item_id='${item_id}'`;
      price_query += `AND orders.item_id='${item_id}'`;
    }
    if (state) {
      order_query += `AND orders.state='${state}'`;
      price_query += `AND orders.state='${state}'`;
    }
    order_query += `group by ${filter_type} ORDER BY ${filter_type} ASC`;
    price_query += `group by ${filter_type} ORDER BY ${filter_type} ASC`;

    Promise.all([pool.query(order_query), pool.query(price_query)])
      .then(([orders, price]) => {
        res({ orders: orders.rows, price: price.rows });
      })
      .catch((err) => {
        rej(err);
      });
  });
module.exports = {
  add_order,
  all_items_order_stats,
  order_by_delivery_state,
  top_branches,
  order_data,
};
