const express = require("express");
const app = express();
require("./db/conn");
const port = process.env.PORT || 3000;
const Register = require("./models/register");

app.use(express.static("../public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views","../views")

app.get("/",function(req,res){
    res.render("index");
});

app.get("/login", function(req,res){
    res.render("login");
});

app.get("/register", function(req,res){
    res.render("register");
});

app.post("/register", function(req,res){
    try{
    const newreg = new Register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newreg.save();

    res.redirect("/");
    }
    catch{
        console.log("error");
    }
});

app.post("/login", async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const usremail = await Register.findOne({email:email});
        // console.log(usremail.password);
        if(usremail.password === password){
            res.send("logged in");
        }
        else{
            res.send("invalid details");
        }
    }
    catch{
        console.log("error");
    }
});

app.listen(3000, function(){
    console.log("server started at "+port);
})