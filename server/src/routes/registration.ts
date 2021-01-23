import express, { Request, Response } from "express";

const bcrypt = require("bcrypt");

const UserSchema = require("../models/user");

const router = express.Router();

router
  .route("/")
  .post(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new UserSchema({ username, email, password: hashedPassword });

    await user
      .save()
      .then(() => {
        const { _id: id } = user;
        res.status(200).send({ id, username, email });
      })
      .catch((err) => {
        console.log("error", err);
      });
  });

module.exports = router;
