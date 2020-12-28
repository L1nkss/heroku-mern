const express = require("express");
const app = express();
const path = require("path");
const host = '0.0.0.0';
const dotenv = require('dotenv');
const port = process.env.PORT || 3001;
const root = path.join(__dirname, "../../client/build");
const mongoose = require('mongoose');
const User = require('./models/user');

dotenv.config();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(root));
  }


app.get('/user', async (req: any, res: any) => {

    try {
        const data = await User.find();
        res.status(200);
        return res.json({data: data});
    } catch (e) {
        console.log("Ошибка при получении данных:", e)
    }
});

app.get('*', (req: any, res: any) => {
    res.sendFile('index.html', { root })
})

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('MongoDB is connected')
    } catch (e) {
        console.log("Server Error", e);
        process.exit();
    }
}

start();

app.listen(port, host, () => {
    console.log('server starts')
})