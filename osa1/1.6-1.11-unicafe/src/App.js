import { useState, useEffect } from "react";

const Headline = ({ text }) => <h1>{text}</h1>;

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) return <p>No feedback given</p>;
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={`${positive} %`} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  useEffect(() => {
    if (all > 0) {
      let points = good - bad;
      setAverage(points / all);
      setPositive((good / all) * 100);
    }
  }, [good, neutral, bad, all]);

  const increaseGood = () => {
    increaseAll();
    setGood(good + 1);
  };
  const increaseNeutral = () => {
    increaseAll();
    setNeutral(neutral + 1);
  };
  const increaseBad = () => {
    increaseAll();
    setBad(bad + 1);
  };

  const increaseAll = () => setAll(all + 1);

  return (
    <div>
      <div>
        <Headline text="Give feedback" />
        <Button handleClick={increaseGood} text="good" />
        <Button handleClick={increaseNeutral} text="neutral" />
        <Button handleClick={increaseBad} text="bad" />
      </div>
      <div>
        <Headline text="Statistics" />
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
      </div>
    </div>
  );
};

export default App;
