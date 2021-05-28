import React from "react";
import Box from "@material-ui/core/Box";

function HomeApp() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1 style={{ textAlign: "center" }}>WELCOME</h1>
      <img src="/Cat-1.jpg" />
    </div>
  );
}

export default HomeApp;
