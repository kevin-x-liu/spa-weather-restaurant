import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Box } from "@material-ui/core";

function Navbar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className="link">
            <HomeIcon />
          </Link>
          <Link to="/weather" className="link">
            <WbSunnyIcon />
          </Link>
          <Link to="/restaurants" className="link">
            <FastfoodIcon />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
