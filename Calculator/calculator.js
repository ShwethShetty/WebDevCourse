const express=require("express");

const bodyParser=require("body-parser");
const { urlencoded } = require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/bmiCalculator.html");
});

app.post("/",function(req,res){
    var n1=Number(req.body.height);
    var n2=Number(req.body.weight);
     var result=n2/(n1*n1);
    
    res.send("BMI is :"+result);

});
app.listen(3000,function(){
    console.log("Listening on port 3000");
});