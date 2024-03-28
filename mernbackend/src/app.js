const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs")
require("./db/conn");

const port = process.env.port || 3000;

const static_path = path.join(__dirname, "../public");
const partials_path = path.join(__dirname, "../partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
hbs.registerPartials(partials_path);


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req,res) => {
    res.render("register");
});

app.listen(port, () => {
    console.log(`Server is running at port 3000`)
})

