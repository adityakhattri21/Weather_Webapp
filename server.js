const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const port = process.env.PORT || 3000;

const apiKey= "6dd11d9eedc30352714b710567053ba5";

const app =  new express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine' , 'ejs');

app.use(express.static("public"));

const date = new Date();

const days = ["Sunday","Monday","Tuseday","Wednesday","Thursday","Friday","Saturday"];

const day = days[date.getDay()];

var hours =date.getHours();

var minute = date.getMinutes();

var end = 'a.m';

if(hours>12){
    hours = Math.abs(hours-12)
    end = 'p.m';
}

if(minute<10){
    minute='0'+minute;
}

app.get("/" , (req,res) =>{
    const url =`https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=6dd11d9eedc30352714b710567053ba5&units=metric`;
    axios.get(url)
    .then( (response)=>{
        const datas = response.data
        const city = datas.name;

     const tempr = datas.main.temp;

     const icon = datas.weather[0].icon;

     const des = datas.weather[0].description

     const humid = datas.main.humidity

     const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;


    
     res.render('index' , {cityName: city , temp: tempr , imgSrc: imageURL, des: des , humid: humid ,day: day ,hour: hours , minute: minute , end: end});
    })
    .catch((error)=>{
        console.log(error);
    })

})

app.get("/about" , (req,res)=>{
    const city ="India"
    res.render("about.ejs" , {cityName: city ,day: day ,hour: hours , minute: minute , end: end});
})

app.post("/" ,(req,res)=>{
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${req.body.value}&appid=${apiKey}&units=metric`;
    axios.get(url)
    .then( (response)=>{
        const datas = response.data
        const city = datas.name;

     const tempr = datas.main.temp;

     const icon = datas.weather[0].icon;

     const des = datas.weather[0].description

     const humid = datas.main.humidity

     const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

     res.render('index' , {cityName: city , temp: tempr , imgSrc: imageURL, des: des , humid: humid ,day: day ,hour: hours , minute: minute ,end: end});
    })
    .catch((error)=>{
        console.log(error);
    })
})

app.listen(port , ()=>{
    console.log(`Server started at port ${port}`);
})
