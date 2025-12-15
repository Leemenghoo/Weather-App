function ForecastCard({ forecastData }) {
  const iconCode = forecastData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const temp = Math.round(forecastData.main.temp);

  const date = new Date(forecastData.dt * 1000);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="forecast-item">
      <h3>{dayName}</h3>
      <img src={iconUrl} alt="weather" />
      <p>{temp}°C</p>
    </div>
  );
}

export default ForecastCard;
