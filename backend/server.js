const express = require("express");
const app = express();
require("./src/db/conn");
const port = process.env.PORT || 3000;
const Register = require("./src/models/register");
const Customer = require("./src/models/customer");
const Employee = require("./src/models/employee");
const Complete = require("./src/models/complete");

//Skj_added employee.js
//skj_added complete.js
var username="";

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/test_skj1", function (req, res) {
  res.render("test_skj1");
});

app.get("/test_skj2", function (req, res) {
  res.render("test_skj2");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/customer", function(req,res){
  const name = username;
  res.render("customer");
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
  Customer.find().then((data) => {
    // res.render("employee", { itemName: data });
    res.render("admin", {name: name, day: day, itemName: data});
  });
});

app.get("/employee", function(req,res){

  Customer.find().then((data) => {
    res.render("employee", { itemName: data });
  });
});

app.post("/delete", function(req, res){
  const checked = req.body.checkbox;
  Customer.deleteOne({ email: checked }).then(function(){
    console.log(" deleted"); // Success
    res.redirect("/admin");
 }).catch(function(error){
    console.log(error); // Failure
 });
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

//EMPLOYEE SCHEMA
app.post("/test_skj1", function (req, res) {
  try {
    const newreg = new Employee({
      name: req.body.name,//to show i/p
      salary: req.body.salary,
      works: req.body.works,
    });
    console.log(newreg);
  //   newreg.save();

  //   res.redirect("/");
   } 
  catch {
    console.log("error");
  }
});

//COMPLETE SCHEMA
app.post("/test_skj2", function (req, res) {
  try {
    const newreg = new Complete({
      name: req.body.name,
      email : req.body.email,
      vehicle_no : req.body.vehicle_no,
      phone : req.body.phone,
      chassis : req.body.chasis,
      problem : req.body.problem,
      date : req.body.date,
      parts :req.body.parts,//to show i/p
      t_cost : req.body.t_cost,
    });
    console.log(newreg);
  //   newreg.save();

  //   res.redirect("/");
   } 
  catch {
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

app.post("/employee", function(req, res){
  const checked = req.body.checkbox;
  Customer.deleteOne({ email: checked }).then(function(){
    console.log(" deleted"); // Success
    res.redirect("employee");
 }).catch(function(error){
    console.log(error); // Failure
 });
});

app.post("/customer", function(req,res){
  try {
    const reg = new Customer({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      vehicle_no: req.body.vehicle_no,
      chassis: req.body.chassis,
      problem: req.body.problem,
      date: req.body.date,
    });
    console.log(reg);
    reg.save();

    res.redirect("/");
  } catch {
    console.log("error");
  }
});

app.listen(port, function () {
  console.log("server started at " + port);
});
