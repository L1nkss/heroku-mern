const UserSchema = require("../models/user");

const checkToken = async (req, res) => {
  const { email } = req;
  await UserSchema.findOne({ email }, (err: any, user: any) => {
    const { username, _id: id, favoriteFilms } = user;
    res.status(200).send({ id, username, email, favoriteFilms });
  });
};

module.exports = checkToken;
