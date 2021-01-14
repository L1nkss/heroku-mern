import express, { Request, Response } from "express";

const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserSchema = require("../models/user");

dotenv.config();

router
  .route("/")
  .post(async (req: Request, res: Response) => {
    const { login, password } = req.body;
    UserSchema.findOne({ login }, (err: any, user: any) => {
      if (err) {
        res.status(500)
          .json({
            error: "Internal error please try again",
          });
      } else if (!user) {
        res.status(401)
          .json({
            error: "Incorrect email or password",
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
                error: "Incorrect email or password",
              });
          } else {
            const payload = { login };
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: "1h",
            });
            res.cookie("token", token, { httpOnly: true })
              .status(200)
              .json({ user });
          }
        });
      }
    });
  });

module.exports = router;
