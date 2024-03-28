const express = require("express");
const path = require('path');
const app = express();
require("./db/conn");
const Register = require("./models/register");
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
        const { email, password } = req.body;
        const user = await Register.findOne({ emailAddress: email });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            res.status(200).redirect("/dashboard");
        } else {
            res.status(401).send("Invalid login details");
        }
    } catch(error) {
        console.error("Login error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/register", async (req, res) => {
    try {
        
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        const registerUser = new Register({
            Name: req.body.Name,
            phone: req.body.phoneNumber,
            emailAddress: req.body.emailAddress,
            password: req.body.password,
            college: req.body.college 
        });

        const registered = await registerUser.save();
        res.status(201).redirect("/login"); 
        
    
        await securePassword(req.body.password);
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).send("Error in registration");
    }
});

const bcrypt = require("bcryptjs");
const securePassword = async(password) =>{
    const passwordHash =  await bcrypt.hash(password, 10);
    console.log( `The hashed Password is : ${passwordHash}` );

    const passwordMatch =  await bcrypt.compare(password, passwordHash);
    console.log(`Matched or not : ${passwordMatch}` );
}
// securePassword("iamgroot&56");










app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});