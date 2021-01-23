const UserSchema = require("../models/user");

const checkToken = async (req, res) => {
  const { email } = req;
  await UserSchema.findOne({ email }, (err: any, user: any) => {
    const { username, _id: id } = user;
    res.status(200).send({ id, username, email });
  });
};

module.exports = checkToken;
