const express = require("express");
const app = express();
require("./src/db/conn");
const port = process.env.PORT || 3000;
const Register = require("./src/models/register");
const Customer = require("./src/models/customer");
const Employee = require("./src/models/employee");
const Complete = require("./src/models/complete");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//Skj_added employee.js
//skj_added complete.js
var username="";
var email = "";

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
  Employee.find().then((empid) => {
    Customer.find().then((data) => {
      console.log(empid[0].email);
      res.render("admin", {name: name, day: day, itemName: data, empname: empid});
    });
  });
});

app.get("/employee", function(req,res){

  Employee.find().then((data) => {
    for(var i=0; i<data.length; i++){
      if(data[i].email === email){
        console.log(data[i].email);
        res.render("employee", { itemName: data[i].works, data: data[i], name: data[i].name});
      }
    }
  });
});

app.get("/success", function(req, res){
  res.render("success");
});

app.get("/failure", function(req, res){
  res.render("failure");
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

    if (newreg.user === "Employee"){
      const newemp = new Employee({
        name: newreg.name,
        email: newreg.email
      });
      newemp.save();
    }

    res.redirect("/");
  } catch {
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
    email = req.body.email;
    const password = req.body.password;

    const usremail = await Register.findOne({ email: email });
    username = usremail.name;
    // console.log(usremail.name);
    if (usremail.password === password) {
        if(usremail.user === "Employee"){
            res.redirect("/employee");
        }
        else if(usremail.user === "Admin"){
            res.redirect("/admin");
        }
    } else {
      res.redirect("/failure");
      // res.send("invalid details");
    }
  } catch {
    res.redirect("/failure");
    // console.log("error");
  }
});

app.post("/employee", function(req, res){
  const checked = req.body.checkbox;
  Employee.deleteOne({ email: checked }).then(function(){
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
    reg.save()
  .then(() => {
    client.messages
          .create({
            body:
              "An appointment has been booked by " +
              reg.name +
              " with vehicle no. " +
              reg.vehicle_no +
              " and the issue is " +
              reg.problem,
            from: process.env.TWILIO_SEND_NO,
            // to: "whatsapp:+971501442785"
            to: "+918075019694"
          })
          .then((message) => console.log(message));
    res.redirect("/success");
  })
  .catch(error => {
    res.redirect("/failure");
    // Handle the error and possibly send an error response to the client
    // res.status(500).send("An error occurred while saving the registration.");
  });

    // res.redirect("/success");
  } catch {
    res.redirect("/failure");
    // console.log("error");
  }
});

app.post("/admin", function(req,res){
  const checked = req.body.checkbox;
  const emp = req.body.user;
  Customer.findOne({ email: checked }, { problem: 1 })
  .exec()
  .then(function (result) {
    // Handle the result here
    const problem = result.problem;
    console.log(emp);
    Employee.updateOne({ email: emp }, { $push: { works: problem } }).then(function () {
      // Update success
      Customer.deleteOne({ email: checked }).then(function () {
        console.log("Deleted");
        res.redirect("admin");
      }).catch(function (error) {
        console.log(error);
      });
    }).catch(function (error) {
      console.log(error);
    });
  })
  .catch(function (error) {
    console.log(error);
    // Handle findOne error
  });

});

app.listen(port, function () {
  console.log("server started at " + port);
});
