const express=require("express");

const https= require("https");
const app= express();
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

    
    const query= req.body.cityName;
    const apiKey="8b9d950e76f4811909d3b73839cdfab8";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey+"&units="+ unit;
    
    https.get(url,function(response){
        console.log(response.statusCode);
    
        response.on("data",function(data){
            const weatherData= JSON.parse(data);
            const temp= weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgURL="http://openweathermap.org/img/wn/" +icon+ "@2x.png";
            res.setHeader("Content-Type", "text/html");
            
            res.write("The weather is currently"+ weatherDescription);
              
            res.write("<h1>The temprature in "+ query +" is "+ temp +" degree celcius</h1>");
            res.write("<img src="+imgURL+">");
            res.send();
            
        });
    });
});

app.listen(3000,function(){
    console.log("Server is running on port 3000.");
});