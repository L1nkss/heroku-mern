import express from 'express';
const app = express();
const PORT = 8000;
const router = express.Router();

router.get('/', (req, res) => {
    console.log(__dirname)
    res.send('Express + Typescript Server');
})


app.listen(process.env.PORT || PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
});