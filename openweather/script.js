const apiKey = "4e5e442af2ae48c8543778ca31527392"; // Replace with your actual API key
const citySearchInput = document.getElementById("input-city");
const submitBtn = document.getElementById("submit");

function getWeatherData(cityName) {
  if (cityName === "") return;

  const errorText = document.querySelector(".error");
  const weatherDetails = document.querySelector(".weather-details");

  errorText.style.display = "none";
  weatherDetails.style.display = "none";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {


      if (data.cod == "404") {
        errorText.style.display = "block";
        errorText.innerHTML = `<img src='images/404.png'>`
        weatherDetails.style.display = "none";
        return;
      }

      const img = document.querySelector(".weather-details img");
      const temperature = document.querySelector(".temperature");
      const description = document.querySelector(".description");
      const humidity = document.querySelector(".humidity span");
      const wind = document.querySelector(".wind span");

      switch (data.weather[0].main) {
        case "Clear":
          img.src = "images/clear.png";
          break;
        case "Rain":
          img.src = "images/rain.png";
          break;
        case "Snow":
          img.src = "images/snow.png";
          break;
        case "Clouds":
          img.src = "images/cloud.png";
          break;
        case "Mist":
          img.src = "images/mist.png";
          break;
        case "Haze":
          img.src = "images/haze.png"
          break;

        default:
          img.src = "";
      }

      temperature.innerHTML = `${(data.main.temp - 273.15).toFixed(0)} °C`;
      description.innerHTML = `${data.weather[0].description}`;
      description.style.textTransform = "capitalize";
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed}Km/h`;


      weatherDetails.style.display = 'block';
    });
}
submitBtn.addEventListener("click", () => {
  const cityName = citySearchInput.value;
  getWeatherData(cityName);
});
