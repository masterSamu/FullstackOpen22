import React, { useState } from "react";
import personService from "../services/persons";

export default function AddPerson({ persons, setPersons }) {
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
      personService.create(newNameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewPerson({ name: "", number: "" });
      });
    } else {
      const confirmUpdatePerson = window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmUpdatePerson) {
        const personObject = persons.find(
          (item) => item.name === newPerson.name
        );
        personObject.number = newPerson.number;

        personService.update(personObject).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== personObject.id ? person : returnedPerson
            )
          );
          setNewPerson({ name: "", number: "" });
        });
      }
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
