import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Weather from "./Weather";

export default function Country({ country, showSingleCountry }) {
  const [weather, setWeather] = useState();
  const name = country.name.common;
  const area = country.area;
  const languages = Object.values(country.languages);
  const flagURL = country.flags.png;
  const capital = {
    name: country.capital[0],
    lat: country.capitalInfo.latlng[0],
    long: country.capitalInfo.latlng[1],
  };
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${capital.lat}&lon=${capital.long}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [showSingleCountry, capital.lat, capital.long]);

  return (
    <>
      <div>
        <h1>{name}</h1>
        <p>{capital.name}</p>
        <p>{area}</p>
        <h2>Languages:</h2>
        <ul>
          {languages.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <img src={flagURL} alt={`${name} flag`} height={"150px"} />
      </div>
      <Weather capitalCity={capital.name} weather={weather} />
    </>
  );
}
