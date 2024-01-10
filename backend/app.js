const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const branch_routes = require("./src/branch/routes");
const items_routes = require("./src/items/routes");
const orders_routes = require("./src/orders/routes");
const stocks_routes = require("./src/stocks/routes");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// routes which handle each module requests
app.use("/api/v1/branch", branch_routes);
app.use("/api/v1/orders", orders_routes);
app.use("/api/v1/items", items_routes);
app.use("/api/v1/stocks", stocks_routes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});

module.exports = app;