import express from 'express';
import path from 'path';
const app = express();
const PORT = 5000;
const router = express.Router();

// app.use(express.static('./client/'));

// router.get('/', (req, res) => {
//     console.log(__dirname)
//     res.send('Express + Typescript Server');
// })

// app.use('/', router)

app.get('/', (req, res) => {
    res.send(path.join(__dirname + '/client/index.html'))
    res.send('Express + Typescript Server');
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
});