const apiKey = 'be7fd6e455440761290bbc27eadfb6e8'; 

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const errorMsg = document.getElementById('errorMsg');
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const feelsLikeEl = document.getElementById('feelsLike');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const weatherIconEl = document.getElementById('weatherIcon');

searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') getWeather();
});

async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        showError("Please enter a city name");
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.status === 401) {
            showError("Invalid API key. Please check your OpenWeather API key.");
            return;
        }
        
        if (response.status === 404) {
            showError("City not found. Please check spelling or try another city.");
            return;
        }
        
        if (!response.ok) {
            showError(`Error: ${data.message || 'Unknown error occurred'}`);
            return;
        }
        
        displayWeather(data);
    } catch (error) {
        showError("Network error. Please check your internet connection.");
    }
}

function displayWeather(data) {
    locationEl.textContent = `${data.name}, ${data.sys.country}`;
    temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionEl.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidityEl.textContent = `${data.main.humidity}%`;
    windSpeedEl.textContent = `${data.wind.speed} m/s`;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherInfo.style.display = 'block';
    errorMsg.style.display = 'none';
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    weatherInfo.style.display = 'none';
}