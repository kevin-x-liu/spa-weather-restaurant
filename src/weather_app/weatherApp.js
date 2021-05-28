import React, { useEffect, useState, useContext } from "react";
import { LocationContext } from "../components/locationContext";
import Forecast from "./components/forecast";
import { Button, Typography, FormLabel, Input } from "@material-ui/core";

const API_KEY = process.env.REACT_APP_weather_key;

function WeatherApp() {
  const [weather, setWeather] = useState(null);

  const { city, setCity } = useContext(LocationContext);

  const { location, setLocation } = useContext(LocationContext);
  console.log(location);
  console.log(city);

  const handleChange = (e) => {
    setLocation(e.target.value);
    zipOrCity(e.target.value);
  };

  const zipOrCity = (str) => {
    if (/^[a-zA-Z]/.test(str)) {
      setCity(true);
    } else {
      setCity(false);
    }
  };

  const newFetch = () => {
    zipOrCity(location);
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.append("appid", API_KEY);
    if (city) {
      url.searchParams.append("q", location);
    } else {
      url.searchParams.append("zip", location);
    }
    url.searchParams.append("units", "imperial");
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        // also important to check html error codes
        // 200 means no errors
        if (obj.cod === 200) {
          setWeather(obj);
        } else {
          setWeather(false);
        }
        // console.log(weather.coord);
      });
  };

  useEffect(() => {
    newFetch();
  }, []);

  if (!weather) {
    return null;
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5">{weather.name}</Typography>
        <Typography variant="h6">
          temperature(F): {weather.main.temp_max} ~ {weather.main.temp_min}
        </Typography>
        <Typography variant="h6">{weather.weather[0].main}</Typography>
      </div>
      <div style={{ textAlign: "center" }}>
        <form>
          <FormLabel>
            Zipcode{": "}
            <Input type="text" value={location} onChange={handleChange} />
          </FormLabel>
        </form>
        <Button onClick={newFetch}>check</Button>
      </div>
      <div>
        <Forecast lon={weather.coord.lon} lat={weather.coord.lat}></Forecast>
      </div>
    </>
  );
}

export default WeatherApp;
