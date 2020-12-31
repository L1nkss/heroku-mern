import express, { Request, Response } from 'express';
const path = require("path");
const router = express.Router();
const usersRouter = require('./users');
const authRouter = require('./authenticate');
const root = path.join(__dirname, "../../../client/build");

console.log("Путь к файлу в файле роутес.ts", root)

// API routes
router.use('/api/users', usersRouter)
router.use('/api/authenticate', authRouter)


// Если нет совпадений по запросу, отправлять React app
router.use('*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root })
})

module.exports = router;
