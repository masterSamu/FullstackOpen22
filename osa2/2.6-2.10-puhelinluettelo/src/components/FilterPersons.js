import React from "react";

export default function FilterPersons({ persons, setPersonsToShow }) {
  const handleFilterChange = (event) => {
    const value = event.target.value;
    const filteredPersons = persons.filter(
      (person) => person.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setPersonsToShow(filteredPersons);
  };
  return (
    <div>
      filter shown with <input onChange={handleFilterChange} />
    </div>
  );
}
