const { if_branch_exist, add_branch, create_branch_table } = require("./database");
const { res_model } = require("../res.model");

const add_new_branch = (req, res) => {
  const { name, user_id } = req.body;
  create_branch_table()
  .then(_ => {
    if_branch_exist(name).then((is_exist) => {
      if (is_exist) {
        res.status(200).send(new res_model(true, null, `${name} already exist`));
      } else {
        add_branch(name, user_id)
          .then((_) => {
            res
              .status(200)
              .send(new res_model(true, null, "Branch added successfully"));
          })
          .catch((err) => {
            res.status(500).send(new res_model(false, err, `Error adding branch ${name}`));
          });
      }
    });
  })

};

module.exports = {
  add_new_branch,
};
