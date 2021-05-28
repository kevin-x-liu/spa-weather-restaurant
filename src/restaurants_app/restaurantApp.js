import React, { useEffect, useState, useContext } from "react";
import { LocationContext } from "../components/locationContext";
import Place from "./components/place";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import {
  Select,
  MenuItem,
  List,
  Button,
  FormLabel,
  Input,
  InputLabel,
} from "@material-ui/core";

const API_KEY = process.env.REACT_APP_google_key;

const MapboxKey = process.env.REACT_APP_MAPBOX_KEY;

function RestaurantApp() {
  const [data, setData] = useState(null);

  // const { data, setData } = useContext(DataContext);

  const [places, setPlaces] = useState(null);

  const { location, setLocation } = useContext(LocationContext);

  const { setCity } = useContext(LocationContext);

  const [sortBy, setSortBy] = useState("hr");

  const [viewport, setViewport] = useState({
    latitude: 38.0318,
    longitude: -78.4896,
    width: "100vw",
    height: "40vh",
    zoom: 15,
  });

  const [selected, setSelected] = useState(null);

  const zipOrCity = (str) => {
    if (/^[a-zA-Z]/.test(str)) {
      setCity(true);
    } else {
      setCity(false);
    }
  };

  let inquiry = "restaurants at " + location;

  const newFetch = () => {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/textsearch/json?"
    );
    url.searchParams.append("key", API_KEY);
    url.searchParams.append("query", inquiry);
    url.searchParams.append("opennow", "");

    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        setData(obj);
        setPlaces(obj.results);
        setViewport({
          ...viewport,
          latitude: obj.results[0].geometry.location.lat,
          longitude: obj.results[0].geometry.location.lng,
        });
      });
  };

  useEffect(() => {
    newFetch();
  }, []);

  const handleChange = (e) => {
    setLocation(e.target.value);
    zipOrCity(e.target.value);
  };

  const handleSelect = (e) => {
    setSortBy(e.target.value);
    sortList();
  };

  // console.log(places);

  if (!places) {
  } else {
    places.forEach((p) => {
      if (!p.price_level) {
        p.price_level = 2;
      }
    });
    sortList();
  }

  function sortList() {
    if (sortBy == "hr") {
      places.sort(function (a, b) {
        return b.rating - a.rating;
      });
    } else if (sortBy == "le") {
      places.sort(function (a, b) {
        return a.price_level - b.price_level;
      });
    } else if (sortBy == "me") {
      places.sort(function (a, b) {
        return b.price_level - a.price_level;
      });
    }
  }

  const placeList = () => {
    return data.results.map((p) => {
      return (
        <>
          <Place
            name={p.name}
            rating={p.rating}
            price={p.price_level}
            location={p.formatted_address}
            type={p.types}
            info={p}
          ></Place>
        </>
      );
    });
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <form>
          <FormLabel>
            Enter City Name/Zip:{" "}
            <Input type="text" value={location} onChange={handleChange}></Input>
          </FormLabel>
          <Button onClick={newFetch}>check</Button>
        </form>
      </div>
      <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MapboxKey}
          mapStyle="mapbox://styles/baguettexl/ckp4b020j825i18moeptjw6pg"
          onViewportChange={(viewport) => {
            setViewport(viewport);
          }}
        >
          {data.results.map((resta) => (
            <Marker
              latitude={resta.geometry.location.lat}
              longitude={resta.geometry.location.lng}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelected(resta);
                }}
              >
                <img src="/restaurant-svgrepo-com.svg" alt="pinIcon" />
              </button>
            </Marker>
          ))}

          {selected ? (
            <Popup
              latitude={selected.geometry.location.lat}
              longitude={selected.geometry.location.lng}
              onClose={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>{selected.name}</h2>
                <p>{selected.formatted_address}</p>
                <p>rating⭐ {selected.rating}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
      <div style={{ textAlign: "center" }}>
        <InputLabel>
          Sort by:{" "}
          <Select value={sortBy} onChange={handleSelect}>
            <MenuItem value={"me"}> Most Expensive</MenuItem>
            <MenuItem value={"le"}> Least Expensive</MenuItem>
            <MenuItem value={"hr"}> Highest Rating</MenuItem>
          </Select>
        </InputLabel>
      </div>
      <div className="list">
        <List>{placeList()}</List>
      </div>
    </>
  );
}

export default RestaurantApp;
