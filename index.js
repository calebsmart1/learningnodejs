const express = require('express');
const path = require('path');
const cookie = require('cookie-parser');
const db = require('./routes/db-config');
const app = express();
app.use("/js", express.static(path.join(__dirname, 'public', 'js')));
app.use("/css", express.static(path.join(__dirname, 'public', 'css')));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());
db.connect((err) => {
    if (err) throw err;
    console.log("database connected");
});
app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"));
app.listen(5000);

