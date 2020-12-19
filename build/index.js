"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const PORT = 5000;
const router = express_1.default.Router();
// app.use(express.static('./client/'));
// router.get('/', (req, res) => {
//     console.log(__dirname)
//     res.send('Express + Typescript Server');
// })
// app.use('/', router)
app.get('/', (req, res) => {
    res.send(path_1.default.join(__dirname + '/client/index.html'));
    res.send('Express + Typescript Server');
});
app.listen(process.env.PORT || PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
