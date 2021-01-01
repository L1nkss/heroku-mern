import express, { Request, Response } from "express";

const router = express.Router();
const UserSchema = require("../models/user");

// Route 'api/users'
router
  .route("/")
  .get(async (req: Request, res: Response) => {
    try {
      await UserSchema.findOneAndUpdate({ login: "testUser" }, { password: "1234sd11wwsss222zzzz" });
      res.status(200);
    } catch (e) {
      console.log("Ошибка при получении данных:", e);
    }
  });

module.exports = router;
