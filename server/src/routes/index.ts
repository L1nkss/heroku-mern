import express, { Request, Response } from "express";

const path = require("path");

const router = express.Router();
const usersRouter = require("./users");
const authRouter = require("./authenticate");
const withAuth = require("../middleware/authJwt");
const logout = require("./logout");
const registration = require("./registration");
const checkToken = require("./check-token");

const root = path.join(__dirname, "../../../client/build");

// API routes
router.use("/api/users", withAuth, usersRouter);
router.use("/api/auth/signin", authRouter);
router.use("/api/logout", logout);
router.use("/api/auth/signup", registration);
router.use("/api/checkToken", withAuth, checkToken);

// Если нет совпадений по запросу, отправлять React app
router.use("*", (req: Request, res: Response) => {
  res.sendFile("index.html", { root });
});

module.exports = router;
