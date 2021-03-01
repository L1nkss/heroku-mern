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

    // $or нужен, чтобы найти пользователя по email или username
    await UserSchema.findOne({ $or: [{ email }, { username }] }, async (err: any, user: any) => {
      if (err) {
        return res.status(500).json({ error: "Internal error please try again" });
      }

      if (user) {
        return res.status(401).json({ error: "User exist" });
      }

      if (password !== confirmPassword) {
        return res.status(401).json({ error: "Passwords don't match" });
      }

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
    });
  });

module.exports = router;
