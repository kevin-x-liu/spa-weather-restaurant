import React, { useEffect, useState } from "react";
import Weather from "./weather";
import {
  Button,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";
// import "fontsource-roboto";

const API_KEY = process.env.REACT_APP_weather_key;

function Forecast(props) {
  const [forecast, setForecast] = useState();

  const [time, setTime] = useState("hour");

  const handleDaily = () => {
    setTime("day");
  };

  const handleHourly = () => {
    setTime("hour");
  };

  useEffect(() => {
    const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("lat", props.lat);
    url.searchParams.append("lon", props.lon);
    url.searchParams.append("units", "imperial");
    url.searchParams.append("exclude", "minutely");
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        setForecast(obj);
      });
  }, [props.lat, props.lon]);

  if (!forecast) {
    return null;
  } else {
    forecast.hourly.forEach((eachHour) => {
      let actualTime = eachHour.dt * 1000;
      let dateObj = new Date(actualTime);
      let humanDate = dateObj.toLocaleString("en-US", { hour: "numeric" });

      eachHour.hourTime = humanDate;
    });
    forecast.daily.forEach((eachDay) => {
      let actualTime = eachDay.dt * 1000;
      let dateObj = new Date(actualTime);
      let humanDate = dateObj.toLocaleString("en-US", { weekday: "long" });

      eachDay.dayTime = humanDate;
    });
  }

  const predictions = () => {
    if (time == "hour") {
      return forecast.hourly.map((h) => {
        return (
          <Weather
            time={h.hourTime}
            weather={h.weather}
            temp={h.temp}
          ></Weather>
        );
      });
    } else {
      return forecast.daily.map((d) => {
        return (
          <Weather
            time={d.dayTime}
            weather={d.weather}
            temp={d.temp.day}
          ></Weather>
        );
      });
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Button onClick={handleHourly}>hourly</Button>
        <Button onClick={handleDaily}>daily</Button>
      </div>
      <br></br>
      <div>
        <Table style={{ width: 400 }} className="center">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Temperature (F)</TableCell>
              <TableCell>Weather</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{predictions()}</TableBody>
        </Table>
      </div>
    </>
  );
}

export default Forecast;
