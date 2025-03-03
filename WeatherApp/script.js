document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "YOUR_API_KEY";  // Replace with your OpenWeather API key
    const searchButton = document.getElementById("searchButton");
    const cityInput = document.getElementById("cityInput");
    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const weatherIcon = document.getElementById("weatherIcon");

    searchButton.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city === "") {
            alert("Please enter a city name");
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "404") {
                    alert("City not found. Try again!");
                    return;
                }

                cityName.textContent = data.name;
                temperature.textContent = `Temperature: ${data.main.temp}°C`;
                description.textContent = `Weather: ${data.weather[0].description}`;
                weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                weatherIcon.alt = data.weather[0].description;
            })
            .catch(error => console.error("Error fetching weather data:", error));
    });
});
