const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");

const port = process.env.port || 3000;

const static_path = path.join(__dirname, "../public");

app.use(express.static(static_path))


app.get("/", (req, res) => {
    res.render("ScoobyDoo!");
});

app.listen(port, () => {
    console.log(`Server is running at port 3000`)
})

