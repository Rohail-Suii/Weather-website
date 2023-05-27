const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');
var lat;
var lng;
const api_key = "f7c4cee675738525b8c8aeb0a521d9fb";

async function checkWeather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    var a = `${weather_data.weather[0].description}`;
    var result = a.charAt(0).toUpperCase() + a.slice(1);
    description.innerHTML = `${result}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.png";
            break;

    }

    console.log(weather_data);
}
async function checkWeather1(lat, lng){
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`;
    
    const weather_data = await fetch(`${url}`).then(response => response.json());
    console.log(weather_data);

    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    var a = `${weather_data.weather[0].description}`;
    var result = a.charAt(0).toUpperCase() + a.slice(1);
    description.innerHTML = `${result}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.png";
            break;

    }

    console.log(weather_data);
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});

// 
// Map-----------------------------
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position){
         lat = position.coords.latitude;
         lng = position.coords.longitude;
         const coords = [lat, lng];
         var map = L.map('map').setView(coords, 13);
         checkWeather1(lat,lng);
        

         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         }).addTo(map);
         
         L.marker(coords)
             .addTo(map)
             .bindPopup('Your Location')
             .openPopup();
             map.on('click', function(mapEvent){
                checkWeather1(mapEvent.latlng.lat, mapEvent.latlng.lng);
                 console.log(mapEvent);
                 const {lat, lng} = mapEvent.latlng;
                 L.marker([lat, lng])
                 .addTo(map)
                 .bindPopup('Your Interest')
                 .openPopup();
             });
                
             
    }, function(){
        alert('Could not get your position')
    });
}
