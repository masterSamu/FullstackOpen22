import React, { useState } from "react";

export default function AddPerson({persons, setPersons, personsToShow, setPersonsToShow}) {
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

  const addPerson = (event) => {
    event.preventDefault();
    const nameExistsInPersons = persons.some(
      (person) => person.name === newPerson.name
    );
    if (!nameExistsInPersons) {
      const newNameObject = {
        name: newPerson.name,
        number: newPerson.number,
      };
      setPersons(persons.concat(newNameObject));
      setPersonsToShow(personsToShow.concat(newNameObject))
      setNewPerson({ name: "", number: "" });
    } else {
      alert(`${newPerson.name} is already added to phonebook!`);
    }
  };

  const handleNameChange = (event) => {
    const personObject = { name: event.target.value, number: newPerson.number };
    setNewPerson(personObject);
  };
  const handleNumberChange = (event) => {
    const personObject = { name: newPerson.name, number: event.target.value };
    setNewPerson(personObject);
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleNameChange} value={newPerson.name} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newPerson.number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
