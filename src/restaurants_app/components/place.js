import React from "react";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from "@material-ui/core";

function Place(props) {
  // console.log(props);

  function priceIcon(num) {
    if (num == 2) {
      return (
        <ListItemIcon>
          <AttachMoneyIcon fontSize="small" />
          <AttachMoneyIcon fontSize="small" />
        </ListItemIcon>
      );
    } else if (num == 3) {
      return (
        <ListItemIcon>
          <AttachMoneyIcon fontSize="small" />
          <AttachMoneyIcon fontSize="small" />
          <AttachMoneyIcon fontSize="small" />
        </ListItemIcon>
      );
    } else {
      return (
        <ListItemIcon>
          <AttachMoneyIcon fontSize="small" />
        </ListItemIcon>
      );
    }
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleClick = (e) => {
    const url = new URL("https://www.google.com/maps/search/?api=1");
    url.searchParams.append("query", e.name + " " + e.formatted_address);
    openInNewTab(url);
  };

  return (
    <ListItem>
      {priceIcon(props.price)}
      <ListItemText primary={props.name} secondary={"⭐" + props.rating} />
      <Button onClick={() => handleClick(props.info)}>Direction</Button>
    </ListItem>
  );
}

export default Place;
