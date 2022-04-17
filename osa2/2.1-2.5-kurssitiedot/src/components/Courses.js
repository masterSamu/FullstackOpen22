const Header = ({ course }) => {
  return <h2>{course}</h2>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((item) => {
        return <Part part={item} key={item.id} />;
      })}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      <b>
        Total of{" "}
        {parts.reduce((previousValue, currentItem) => {
          return previousValue + currentItem.exercises;
        }, 0)}{" "}
        exercises
      </b>
    </p>
  );
};

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((item) => {
        return (
          <div key={item.id}>
            <Header course={item.name} />
            <Content parts={item.parts} />
            <Total parts={item.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Courses;
