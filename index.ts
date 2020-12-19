const express = require("express");
const app = express();
const path = require("path")

console.log(path.join(__dirname, "client", "public"))
app.use(express.static(path.join(__dirname, "client", "public")))
app.use(express.static("client/public"))


app.use((req: any, res: any, next: any) => {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"))
})

app.listen(5000, () => {
    console.log('server works')
})