import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import CloudIcon from "@material-ui/icons/Cloud";
import GrainIcon from "@material-ui/icons/Grain";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import AcUnitIcon from "@material-ui/icons/AcUnit";

function Weather(props) {
  let icon = <CloudIcon></CloudIcon>;

  const weatherIcon = (condition) => {
    switch (condition) {
      case "Clouds":
        icon = <CloudIcon></CloudIcon>;
        break;
      case "Rain":
        icon = <GrainIcon></GrainIcon>;
        break;
      case "Snow":
        icon = <AcUnitIcon></AcUnitIcon>;
        break;
      default:
        icon = <WbSunnyIcon></WbSunnyIcon>;
        break;
    }
    return icon;
  };

  return (
    <TableRow>
      <TableCell>{props.time}</TableCell>
      <TableCell>{props.temp}</TableCell>
      <TableCell>
        {weatherIcon(props.weather[0].main)} {props.weather[0].main}
      </TableCell>
    </TableRow>
  );
}

export default Weather;
