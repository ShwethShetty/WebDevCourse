const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");




const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    console.log(req.body.cityName);
    const city=req.body.cityName;
    const APIKey="a1bbf8bb054b5d68415942fa9b87bf14#";
    const unit="metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+APIKey;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const wData=JSON.parse(data);
            const temp=wData.main.temp;
            const desc=wData.weather[0].description;
            const icon=wData.weather[0].icon;
            const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The temperature in "+city+" is "+temp+" degree Celcius</h1>");
            res.write("<h1>The weather currently is "+desc+"</h1>");
            res.write("<img src=" + imgUrl+">");
            res.send();
        });
    });
    
})




app.listen(3000, function(){
    console.log("Listening on Server 3000");
})