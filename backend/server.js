const express = require("express");
const app = express();
require("./src/db/conn");
const port = process.env.PORT || 3000;
const Register = require("./src/models/register");
var username="";

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/customer", function(req,res){
  const name = username;
  res.render("customer", {name: name});
});

app.get("/admin", function(req,res){
  const name = username;
  var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

  var day = today.toLocaleDateString("en-US", options);
  res.render("admin", {name: name, day: day});
});

app.get("/employee", function(req,res){
  const name = username;
  res.render("employee", {name: name});
});

app.post("/", function(req,res){
  res.redirect("/");
});

app.post("/register", function (req, res) {
  try {
    const newreg = new Register({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      user: req.body.user
    });
    newreg.save();

    res.redirect("/");
  } catch {
    console.log("error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const usremail = await Register.findOne({ email: email });
    username = usremail.name;
    // console.log(usremail.name);
    if (usremail.password === password) {
        if(usremail.user === "Customer"){
            res.redirect("/customer");
        }
        else if(usremail.user === "Admin"){
            res.redirect("/admin");
        }
        else{
            res.redirect("/employee");
        }
    } else {
      res.send("invalid details");
    }
  } catch {
    console.log("error");
  }
});

app.post("/customer", function(req,res){
  res.redirect("/")
});

app.listen(port, function () {
  console.log("server started at " + port);
});
