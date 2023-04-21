const express = require("express");
const app = express();
require("./db/conn");
const port = process.env.PORT || 3000;
app.use(express.static("../public"));

app.get("/",function(req,res){
    res.send("hello world")
});

app.listen(3000, function(){
    console.log("server started at "+port);
})