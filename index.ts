const express = require("express");
const app = express();
const path = require("path");
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client", "build")))
app.use(express.static("client/build"))


// app.use((req: any, res: any, next: any) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"))
// })
app.get('*', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, host, () => {
    console.log('server works')
})