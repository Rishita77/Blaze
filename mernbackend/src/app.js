const express = require("express");
const app = express();
// const path = require("path");
const PORT = process.env.PORT || 3000;
require("./db/conn");
// const static_path = path.join(__dirname, "../public");


// app.use(express.static(static_path));
app.get("/", (req,res) =>{
    res.send("ScoobyDoo!")
});
app.listen(PORT, () => {
    console.log(`Server is running at port number ${PORT}`);
})