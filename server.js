const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const fs = require('fs')

const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/libro-logo.ico'));
//the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  const filePath = path.resolve(__dirname, "./build", "index.html");;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data
      .replace(/__TITLE__/g, "Home Page")
      .replace(/__DESCRIPTION__/g, "Home page description.");

    res.send(data)
  });
});

app.listen(port);