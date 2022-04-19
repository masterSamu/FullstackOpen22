import { useState, useEffect } from "react";
import axios from "axios";
import AddPerson from "./components/AddPerson";
import ShowPersons from "./components/ShowPersons";
import FilterPersons from "./components/FilterPersons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [filterValue, setFilterValue] = useState("asd");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredPersons = persons.filter(
      (person) =>
        person.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
    );
    setPersonsToShow(filteredPersons);
  }, [filterValue, persons]);

  useEffect(() => {
    setPersonsToShow(persons);
  }, [persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons setFilterValue={setFilterValue} />
      <h2>Add new</h2>
      <AddPerson
        persons={persons}
        setPersons={setPersons}
        personsToShow={personsToShow}
        setPersonsToShow={setPersonsToShow}
      />
      <h2>Numbers</h2>
      {filterValue.length > 0 ? (
        <ShowPersons persons={personsToShow} />
      ) : (
        <ShowPersons persons={persons} />
      )}
    </div>
  );
};

export default App;
