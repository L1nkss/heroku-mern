const express = require("express");
const app = express();
const path = require("path");
const host = '0.0.0.0';
const port = process.env.PORT || 3001;
const clientBuildPath = "../client/build/index.html"
const clientBuildPath2 = "../client/build"

const root = path.join(__dirname, "../../client/build");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(root));
  }

app.get('*', (req: any, res: any) => {
    res.sendFile('index.html', { root })
})

app.listen(port, host, () => {
    console.log('server works')
})