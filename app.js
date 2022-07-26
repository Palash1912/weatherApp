let weather = {
    apikey: "62dd9bb18c59726ba80568b15880adab",
    fetchWeather: function (city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apikey
        ).then((response)=>response.json())
        .then((data)=>this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name}=data; //it will extract the name from the data json file
        const {icon, description} = data.weather[0]; //icon & dec will be extracted from data.weather
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name,icon,description,temp,humidity,speed)
       
        document.querySelector(".city").innerText="Weather in "+name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".description").innerText=description;
        document.querySelector(".temp").innerText=temp+"°C";
        document.querySelector(".humidity").innerText="Humidity: "+humidity+"%";
        document.querySelector(".wind").innerText="Wind Speed: "+speed+"m/sec";

        // to remove visibility hidden
        document.querySelector(".weather").classList.remove("loading");

        // to update background image
        document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+name+"')"
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

// to search when pressed enter 
document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key==="Enter"){
        weather.search();
    }
});

//when page is load up, delhi's weather will be displayed
weather.fetchWeather("delhi");

