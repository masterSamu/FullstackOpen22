import { useState } from "react";
import Country from "./Country";

export default function ShowCountries({
  countries,
  showSingleCountry,
  setShowSingleCountry,
}) {
  const [country, setCountry] = useState();

  const handleClick = (country) => {
    setShowSingleCountry(!showSingleCountry);
    setCountry(country);
  };

  if (showSingleCountry) {
    return <Country country={country} showSingleCountry={showSingleCountry} />;
  } else {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter.</p>;
    } else if (countries.length === 1) {
      return <Country country={countries[0]} showSingleCountry={showSingleCountry} />;
    } else {
      return countries.map((country) => {
        return (
          <div key={country.name.common}>
            <span >{country.name.common}</span>
            <button onClick={() => handleClick(country)}>show</button>
          </div>
        );
      });
    }
  }
}
