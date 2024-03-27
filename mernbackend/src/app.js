const express = require("express");
const path = require('path');
const app = express();
require("./db/conn");
const Register = require("../src/models/register");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/login", (req,res)=>{
    res.render("login");
});

app.post("/login", async(req,res)=>{
    try{
        // create email and this is in html name="email"
        const email = req.body.email;
        const password = req.body.password;
          //     database email name : current email
        const userEmail = await Register.findOne({emailAddress: email});
        if(userEmail.password === password){
            res.status(201).render("index");
        }else{
            res.send("Invalid login Details");
        }
    }catch(error){
        res.status(400).send("invalid Email");
    }
});

app.get("/register", (req, res) => {
    res.render('register', { message: "user registration page" });
});

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if (password === confirmPassword) {
            const registerUser = new Register({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthday: req.body.birthdayDate,
                gender: req.body.inlineRadioOptions,
                emailAddress: req.body.emailAddress,
                phone: req.body.phoneNumber,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            });

            const registered = await registerUser.save();
            res.status(201).redirect("/"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});