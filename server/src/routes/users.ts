import express, { Request, Response } from "express";

const router = express.Router();
const UserSchema = require("../models/user");

// Route 'api/users/addToFavorite'
router
  .route("/addToFavorite")
  .put(async (req: Request, res: Response) => {
    try {
      const { userID, ...data } = req.body;
      const user = await UserSchema.findOne({ _id: userID });
      const filmIndex = user.favoriteFilms.findIndex((element) => element.id === data.id);
      const updateOptions = filmIndex !== -1
        ? { $pull: { favoriteFilms: { id: data.id } } }
        : { $push: { favoriteFilms: data } };

      UserSchema.findOneAndUpdate(
        { _id: userID }, updateOptions,
        { new: true },
        (err, doc) => {
          if (err) {
            throw new Error();
          }
          res.status(200).send(doc.favoriteFilms);
        },
      );
    } catch (e) {
      console.log("Ошибка при добавлении фильма в избранное", e);
    }
  });

module.exports = router;
