import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import WeatherApp from "./weather_app/weatherApp";
import RestaurantApp from "./restaurants_app/restaurantApp";
import HomeApp from "./home_app/homeApp";
import Navbar from "./components/navbar";
import LocationProvider from "./components/locationContext";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <>
      <LocationProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar></Navbar>
          <main>
            <Switch>
              <Route path="/" component={HomeApp} exact />
              <Route path="/weather" component={WeatherApp} />
              <Route path="/restaurants" component={RestaurantApp} />
            </Switch>
          </main>
        </ThemeProvider>
      </LocationProvider>
    </>
  );
}

export default App;
