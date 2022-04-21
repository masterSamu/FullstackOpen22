import { useState, useEffect } from "react";
import axios from "axios";
import ShowCountries from "./components/ShowCountries";

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [showSingleCountry, setShowSingleCountry] = useState(false);
  console.log(process.env.REACT_APP_OPENWEATHERMAP_API_KEY)

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    const filterValue = event.target.value;
    const filteredCountries = countries.filter(
      (country) =>
        country.name.common.toLowerCase().indexOf(filterValue.toLowerCase()) !==
        -1
    );
    setCountriesToShow(filteredCountries);
    setShowSingleCountry(false);
  };

  return (
    <div>
      <input onChange={handleSearch} />
      <ShowCountries
        countries={countriesToShow}
        showSingleCountry={showSingleCountry}
        setShowSingleCountry={setShowSingleCountry}
      />
    </div>
  );
}

export default App;
