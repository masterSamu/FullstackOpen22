import { useState, useEffect } from "react";
import personService from "./services/persons";
import AddPerson from "./components/AddPerson";
import ShowPersons from "./components/ShowPersons";
import FilterPersons from "./components/FilterPersons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  let personsToShow = [];

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const deletePerson = (person) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${person.name}`
    );
    if (confirmDelete) {
      personService
        .deleteItem(person.id)
        .then(setPersons(persons.filter((item) => item.id !== person.id)));
    }
  };

  if (filterValue.length > 0) {
    personsToShow = persons.filter(
      (person) =>
        person.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
    );
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons setFilterValue={setFilterValue} />
      <h2>Add new</h2>
      <AddPerson
        persons={persons}
        setPersons={setPersons}
        personsToShow={personsToShow}
      />
      <h2>Numbers</h2>
      {filterValue.length > 0 ? (
        <ShowPersons persons={personsToShow} deletePerson={deletePerson} />
      ) : (
        <ShowPersons persons={persons} deletePerson={deletePerson} />
      )}
    </div>
  );
};

export default App;
