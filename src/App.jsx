import { useState, useEffect } from "react";
import WeatherInfo from "./components/WeatherInfo.jsx";
import ForecastCard from "./components/ForecastCard.jsx";

function App() {
  const API_KEY = "200a79d8bbd407860de026805284bfc7";

  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");

  const cityList = [
    "Phnom Penh",
    "Siem Reap",
    "Battambang",
    "Sihanoukville",
    "Kampot",
    "Takeo",
    "Stung Treng",
    "Kampong Cham",
    "Kampong Thom",
    "Kampong Speu",
    "Pailin",
    "Ratanakiri",
    "Kratie",
    "Svay Rieng",
    "Banteay Meanchey",
    "Prey Veng",
    "Kandal",
    "Koh Kong",
    "Preash Vihear",
    "Pursat",
  ];

  const fetchWeather = async (city) => {
    try {
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        setError("City not found! Try another city.");
        return;
      }

      const data = await response.json();
      setWeatherData(data);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );

      const forecastData = await forecastResponse.json();

      const next4Days = [];
      const dates = [];

      for (let i = 0; i < forecastData.list.length; i++) {
        const item = forecastData.list[i];
        const date = new Date(item.dt * 1000);
        const day = date.getDate();

        if (!dates.includes(day) && next4Days.length < 4) {
          dates.push(day);
          next4Days.push(item);
        }
      }

      setForecast(next4Days);
    } catch (err) {
      setError("Something went wrong with the API!");
    }
  };

  const fetchByLocation = async (lat, lon) => {
    try {
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      const data = await response.json();
      setWeatherData(data);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      const forecastData = await forecastResponse.json();

      const next4Days = [];
      const dates = [];

      for (let i = 0; i < forecastData.list.length; i++) {
        const item = forecastData.list[i];
        const date = new Date(item.dt * 1000);
        const day = date.getDate();

        if (!dates.includes(day) && next4Days.length < 4) {
          dates.push(day);
          next4Days.push(item);
        }
      }

      setForecast(next4Days);
    } catch (err) {
      setError("Failed to get your location weather");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchByLocation(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.log("Location access denied");
        }
      );
    }
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && cityName !== "") {
      fetchWeather(cityName);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Weather App</h1>

        <input
          type="text"
          list="cityList"
          className="search-input"
          placeholder="Enter a city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          onKeyPress={handleSearch}
        />

        {/* show suggestions on search bars */}

        <datalist id="cityList">
          {cityList.map((city, index) => (
            <option key={index} value={city} />
          ))}
        </datalist>

        {/* end show suggestions on search bars */}

        {error && <div className="error-box">{error}</div>}

        {/* if no data and error show welcome message */}

        {!weatherData && !error && (
          <div className="welcome-box">
            <h2>Welcome to Weather App!</h2>
            <p>Type a city name and press Enter</p>
          </div>
        )}

        {/* end if no data and error show welcome message */}

        {weatherData && (
          <>
            <WeatherInfo weatherData={weatherData} />

            <div className="forecast-box">
              {forecast.map((day, index) => (
                <ForecastCard key={index} forecastData={day} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
