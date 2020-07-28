const api = {
  key: "ef03d95e45921ca03c27811dda33ed99",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septermber",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const city = document.querySelector(".city");
const disDate = document.querySelector(".date");
const searchBox = document.querySelector(".search");
const temperature = document.querySelector(".temperature");
const weatherDis = document.querySelector(".weather");
const minMax = document.querySelector(".min-max");
const humidity = document.querySelector(".humidity");
const feelsLike = document.querySelector(".feels-like");
const preloaderContainer = document.querySelector(".preloader");

searchBox.addEventListener("keypress", runQuery);
preloaderContainer.style.display = "none";

function runQuery(e) {
  if (e.keyCode == 13) {
    preloaderContainer.style.display = "block";
    getResults(searchBox.value);
  }
}

function makeDate(d) {
  let dateObj = {
    day: days[d.getDay()],
    date: d.getDate(),
    month: months[d.getMonth()],
    year: d.getFullYear(),
  };
  return `${dateObj.day} ${dateObj.date} ${dateObj.month} ${dateObj.year}`;
}

function displayResults(weather) {
  city.textContent = `${weather.name}, ${weather.sys.country}`;
  disDate.textContent = makeDate(new Date());
  temperature.innerHTML = `${Math.round(
    weather.main.temp
  )} <span>&deg;C</span>`;
  weatherDis.textContent = weather.weather[0].main;
  minMax.innerHTML = `${Math.round(weather.main.temp_min)}&deg;C / ${Math.round(
    weather.main.temp_max
  )}&deg;C`;
  humidity.textContent = `Humidity: ${weather.main.humidity}`;
  feelsLike.innerHTML = `Feels Like: ${weather.main.feels_like}&deg;C`;
  preloaderContainer.style.display = "none";
}

function getResults(placeName) {
  fetch(`${api.baseurl}weather?q=${placeName}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}
