import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Headline = ({ text }) => <h1>{text}</h1>;

const Statistics = ({ anecdotes, points }) => {
  const maxPoints = Math.max(...points);
  if (maxPoints === 0) return <p>No votes today</p>;
  const indexOfMaxPoints = points.indexOf(maxPoints);
  return (
    <Anecdote
      anecdote={anecdotes[indexOfMaxPoints]}
      votes={points[indexOfMaxPoints]}
    />
  );
};

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const changeSelectedValue = () => {
    setSelected(getRandomInt(anecdotes.length));
  };

  const increasePoints = () => {
    const newPoints = [...points];
    newPoints[selected] = newPoints[selected] + 1;
    setPoints(newPoints);
  };

  return (
    <div>
      <Headline text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={increasePoints} text="Vote" />
      <Button handleClick={changeSelectedValue} text="Next anecdote" />
      <Headline text="Anecdote with most votes" />
      <Statistics anecdotes={anecdotes} points={points} />
    </div>
  );
};

export default App;
