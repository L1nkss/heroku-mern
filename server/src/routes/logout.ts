import express, { Request, Response } from "express";

const router = express.Router();

router
  .route("/")
  .post((req: Request, res: Response) => {
    res.clearCookie("token");
    return res.sendStatus(200);
  });

module.exports = router;
