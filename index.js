var express = require("express");
var app = express();
var path = require("path");
console.log(path.join(__dirname, "client", "public"));
app.use(express.static(path.join(__dirname, "client", "public")));
app.use(express.static("client/public"));
app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});
app.listen(5000, function () {
    console.log('server works');
});
