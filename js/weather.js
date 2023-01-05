const LOCATION_API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';  //Create an account on opencage and grab your key
const LOCATION_API_URL = 'https://api.opencagedata.com/geocode/v1/json';

const WEATHER_API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';  //Create an account on openweathermap and grab your key
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function getCoordinates() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                if (error.code === 1) {
                    console.log("Error: Location permission denied by user. Using default coordinates.");
                    resolve({
                        lat: 45.4215,
                        lng: -75.6972
                    }); // Default coordinates for Ottawa
                } else {
                    console.log("Error: " + error.message);
                }
                reject(error);
            }
        );
    });
}

async function getCity(coordinates) {
    const {
        lat,
        lng
    } = coordinates;
    const response = await fetch(`${LOCATION_API_URL}?q=${lat}+${lng}&key=${LOCATION_API_KEY}`);
    const data = await response.json();
    return data.results[0].components.city;
}

async function getWeather(city) {
    const response = await fetch(
        `${WEATHER_API_URL}?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
    );
    const data = await response.json();
    return data;
}


window.onload = async function () {
    const coordinates = await getCoordinates();
    const city = await getCity(coordinates);
    const weatherData = await getWeather(city);

    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const temperature = Math.round(weatherData.main.temp);
    const cityName = city;

    document.getElementById('weather-icon').src = weatherIconUrl;
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('city-name').textContent = cityName;

    document.getElementById('weather-container').addEventListener('click', function () {
        const openweatherUrl = `https://openweathermap.org/city/${weatherData.id}`;
        window.open(openweatherUrl, '_blank');
    });
}