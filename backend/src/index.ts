import express from 'express';
const app = express();
const PORT = 8000;

app.get('/', (req, res) => res.send('Express + Typescript Server'));

app.listen(process.env.PORT || PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
});