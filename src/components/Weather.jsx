import React, { useEffect, useState, useRef } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import clear_icon from "../assets/clear.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef();

  const allIcon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);

      const data = await response.json();

      if (!response.ok) {

        console.error("API error:", data.message);
        alert(data.message || "City not found");
        inputRef.current.value = "";
        setWeatherData(false); // 🔥 fix here
       
        return;
      }

      else if(response.ok){
        inputRef.current.value = "";
        


      }








    //   if (!response.ok) {
    //     alert("city not found");
    //     inputRef.current.value = "";
    //     return;
    //   }

      console.log(data);

      const icon = allIcon[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {

        console.error("Network or fetch error:", error);
        setWeatherData(false);
        alert("An error occurred while fetching weather data.");




    //   setWeatherData(false);
    //   console.error("Error in fetching data");
    }
  };

  useEffect(() => {



    search();
   

  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" ref={inputRef} placeholder="Search" />
        <img
          src={search_icon}
          alt=""
        //   onClick={() => search(inputRef.current.value)}
        onClick={() => {
            const city = inputRef.current.value.trim();
            if (city === "") {
              alert("Enter city name");
              return;
            }
            search(city);
          }}




        />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>{" "}
        </>
      ) : null}
    </div>
  );
};

export default Weather;
