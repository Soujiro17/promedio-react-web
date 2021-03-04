const favicon = require('express-favicon');
const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(favicon(__dirname + '/build/libro-logo.ico'));

app.get("/", (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    
    data = data
    .replace(/__TITLE__/g, "Calcula mi promedio")
    .replace(/__DESCRIPTION__/g, "Calcula tu promedio de forma fácil y sencilla! También contamos con tablas de frecuencia con datos ordenados y no.");
    
    res.send(data)
  });
});

app.use(express.static(path.resolve(__dirname, "./build")));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})