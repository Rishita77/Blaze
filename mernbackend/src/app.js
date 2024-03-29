const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs")
require("./db/conn");

const Register = require("./models/registers");

const port = process.env.port || 3000;

const static_path = path.join(__dirname, "../public");
const partials_path = path.join(__dirname, "../partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
hbs.registerPartials(partials_path);


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req,res) => {
    res.render("register");
});

app.get("/login", (req,res)=>{
    res.render("login");
});

app.post("/register", async (req,res) => {
    try {
        const password = req.body.password;

        const registerStudent = new Register({
            name : req.body.fullname,
            phone : req.body.phone,
            email : req.body.email,
            password : req.body.password

        })

        const registered = await registerStudent.save();
        res.status(201).redirect("/login"); 

        
    } catch (error) {
        res.status(400).send(error);
    }
});


app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await Register.findOne({ email: email });
        if (user && user.password === password) {
            res.status(200).render("home");
        } else {
            res.status(401).send("Invalid login details");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


app.listen(port, () => {
    console.log(`Server is running at port 3000`)
})

