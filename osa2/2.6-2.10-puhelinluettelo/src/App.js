import { useState } from "react";
import AddPerson from "./components/AddPerson";
import ShowPersons from "./components/ShowPersons";
import FilterPersons from "./components/FilterPersons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [personsToShow, setPersonsToShow] = useState(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons persons={persons} setPersonsToShow={setPersonsToShow} />
      <h2>Add new</h2>
      <AddPerson
        persons={persons}
        setPersons={setPersons}
        personsToShow={personsToShow}
        setPersonsToShow={setPersonsToShow}
      />
      <h2>Numbers</h2>
      <ShowPersons persons={personsToShow} />
    </div>
  );
};

export default App;
