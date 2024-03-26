const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const hbs = require("hbs");

require("./db/conn");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");

app.set("views", template_path);
hbs.registerPartials(partials_path)
app.get("/", (req,res) =>{
    res.render("index")
});


app.listen(PORT, () => {
    console.log(`Server is running at port number ${PORT}`);
})