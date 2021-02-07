import express, { Request, Response } from "express";

const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserSchema = require("../models/user");

dotenv.config();

router
  .route("/")
  .post(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    UserSchema.findOne({ email }, (err: any, user: any) => {
      if (err) {
        res.status(500)
          .json({
            error: "Internal error please try again",
          });
      } else if (!user) {
        res.status(401)
          .json({
            error: "Incorrect email",
          });
      } else {
        user.isCorrectPassword(password, (error: any, same: any) => {
          if (error) {
            res.status(500)
              .json({
                error: "Internal error please try again",
              });
          } else if (!same) {
            res.status(401)
              .json({
                error: "Incorrect password",
              });
          } else {
            const payload = { email };
            const { username, favoriteFilms, _id: id } = user;
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: "1h",
            });
            res.cookie("token", token, { httpOnly: true })
              .status(200)
              .json({
                username, id, email, favoriteFilms,
              });
          }
        });
      }
    });
  });

module.exports = router;
