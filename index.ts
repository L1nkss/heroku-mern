const express = require("express");
const app = express();
const path = require("path")

app.use(express.static(path.join(__dirname, "client", "build")))
app.use(express.static("client/build"))


app.use((req: any, res: any, next: any) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(5000, () => {
    console.log('server works')
})