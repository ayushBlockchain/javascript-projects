const apiKey = "d20dfb888b188d06fa550d03f922c139";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " Km/h";

        const weather = data.weather[0].main;
        if (weather === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weather === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weather === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weather === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weather === "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});
