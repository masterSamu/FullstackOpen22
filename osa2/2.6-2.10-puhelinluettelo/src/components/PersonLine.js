import React from "react";

export default function PersonLine({ person }) {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
}
