class res_model {
  is_success;
  data;
  message;

  constructor(is_success, data, message) {
    this.data = data;
    this.is_success = is_success;
    this.message = message;
  }
}

module.exports = {
  res_model,
};
