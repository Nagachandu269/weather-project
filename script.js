const apiKey = 'be247cb7771b6bc23b7408c81f16de27'; // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', function() {
    const locationInput = document.querySelector('.input-box').value;
    if (locationInput) {
        getWeather(locationInput);
    } else {
        alert('Please enter a location!');
    }
});

async function getWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeatherUI(data) {
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    document.querySelector('.temperature').innerHTML = `${temperature} <sup>°C</sup>`;
    document.querySelector('.description').innerText = description.charAt(0).toUpperCase() + description.slice(1);
    document.getElementById('humidity').innerText = `${humidity}%`;
    document.getElementById('wind-speed').innerText = `${Math.round(windSpeed)} Km/H`;
}
function updateWeatherIcon(weatherCondition) {
    const iconMap = {
        Clear: 'clear.png',
        Clouds: 'clouds.png',
        Rain: 'rain.png',
        Snow: 'snow.png',
        // Add more conditions and their corresponding icons
    };

    const iconUrl = iconMap[weatherCondition] || 'default.png'; // Fallback to a default icon if not found
    document.querySelector('.weather-icon').src = iconUrl;
}