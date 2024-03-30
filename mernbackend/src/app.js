const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs")
require("./db/conn");

const Register = require("./models/registers");
const Suggestion = require("./models/suggestion");
const RegisterSoc = require("./models/regsoc");

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

app.get("/colleges", (req,res)=>{
    res.render("colleges");
});

app.get("/home", (req,res)=>{
    res.render("home");
});

app.get("/societies", (req,res)=>{
    res.render("societies");
});


app.get("/suggestion", (req,res)=>{
    res.render("suggestion");
});

app.get("/regsoc", (req,res)=>{
    res.render("regsoc");
});



app.post("/register", async (req,res) => {
    try {

        const registerStudent = new Register({
            name : req.body.name,
            phone : req.body.phone,
            email : req.body.email,
            password : req.body.password

        });

        const registered = await registerStudent.save();
        res.status(201).render("home"); 

        
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

app.post("/suggestion", async (req, res) => {
    try {
        const registerSugg = new Suggestion({
            name: req.body.name,
            email: req.body.email,
            college: req.body.college,
            phnumber: req.body.telephone, 
            subject: req.body.subject,
            message: req.body.message,
            speaker: req.body.speaker
        });

        const suggested = await registerSugg.save();
        res.status(201).render("home", { message: "Thanks for the suggestion!" }); 
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/regsoc", async (req, res) => {
    try {
        const registerSoc = new RegisterSoc({
            president: req.body.president,
            email: req.body.email,
            emailsoc: req.body.emailsoc,
            college: req.body.college,
            phnumber: req.body.phone, 
            name: req.body.name,
            message: req.body.message
        });

        const soc = await registerSoc.save();
        res.status(201).render("home", { message: "Thanks we will contact you soon!" }); 
    } catch (error) {
        res.status(400).send(error);
    }
});


app.listen(port, () => {
    console.log(`Server is running at port 3000`)
})

