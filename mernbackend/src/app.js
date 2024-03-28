const express = require("express");
const app = express();
const port = process.env.port || 3000;


app.get("/", (req, res) => {
    res.render("ScoobyDoo!");
});

app.listen(port, () => {
    console.log(`Server is running at port 3000`)
})

