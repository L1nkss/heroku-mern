import express, { Request, Response } from "express";

const bcrypt = require("bcrypt");

const UserSchema = require("../models/user");

const router = express.Router();

router
  .route("/")
  .post(async (req: Request, res: Response) => {
    const {
      username, email, password, confirm_password: confirmPassword,
    } = req.body;

    await UserSchema.findOne({ $or: [{ email }, { username }] }, async (err: any, user: any) => {
      if (err) {
        res.status(500)
          .json({
            error: "Internal error please try again",
          });
      } else if (user) {
        res.status(401)
          .json({
            error: "User exist",
          });
      } else if (password !== confirmPassword) {
        res.status(401)

          .json({
            error: "Passwords don't match",
          });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new UserSchema({ username, email, password: hashedPassword });

        await newUser
          .save()
          .then(() => {
            const { _id: id, favoriteFilms } = newUser;
            res.status(200).send({
              id, username, email, favoriteFilms,
            });
          })
          .catch((error) => {
            res.status(500)
              .json({
                error: "Internal error please try again",
              });
          });
      }
    });
  });

module.exports = router;
