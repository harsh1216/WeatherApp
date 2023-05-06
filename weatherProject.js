const express = require('express');
const app = express();
const https = require("https")
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");


})

app.post("/",function(req,res){
  const city = req.body.cityName;
  const apiKey = "10e09195e203f46295eab835e7907756";
  var unit = req.body.unit;
  if(req.body.unit == "metric"){
    var outputUnit = " °C";
  }else if (req.body.unit=="imperial") {
    var outputUnit=" °F";
  }else if (req.body.unit=="standard") {
    var outputUnit = " K";
    var unit ="";
  }
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city +"&units="+unit+"&appid="+apiKey;
  https.get(url,function(response){

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>welcome to Api using openWeather maps</p>")
      if(req.body.discription == "on"){
        res.write("<p>the weather description is "+ weatherDescription+"</p>");
      }else{
        console.log("no");
      }
      res.write("<h1>the temperature in "+city+" is "+ temp +""+ outputUnit+"</h1>");
      res.write("<img src="+iconUrl+">")
      res.send();
    })
  })
})



// const city = "india";





app.listen(3000, function(){
  console.log("your server it active at port 3000")
});
