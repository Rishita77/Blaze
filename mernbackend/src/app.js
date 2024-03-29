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


app.post("/login", async(req,res)=>{
    try{
        
        const email = req.body.email;
        const password = req.body.password;
          
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

app.listen(port, () => {
    console.log(`Server is running at port 3000`)
})

