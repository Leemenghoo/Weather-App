function WeatherInfo({ weatherData }) {
  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const temp = Math.round(weatherData.main.temp);
  const city = weatherData.name;
  const description = weatherData.weather[0].description;

  return (
    <div className="weather-display">
      <img src={iconUrl} alt="weather icon" className="weather-icon" />

      <div className="weather-text">
        <h2>Today</h2>
        <h1>{city}</h1>
        <p className="temperature">Temperature: {temp}°C</p>
        <p className="weather-desc">{description}</p>
      </div>
    </div>
  );
}

export default WeatherInfo;
