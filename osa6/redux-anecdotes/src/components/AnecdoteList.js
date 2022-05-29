import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter.length === 0) {
      return state.anecdotes;
    } else {
      const filterValue = state.filter;
      const filteredAnecdotes = state.anecdotes.filter(
        (a) => a.content.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
      );
      return filteredAnecdotes;
    }
  });

  const vote = (id) => {
    const anecdoteToChange = anecdotes.find((a) => a.id === id);
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };
    dispatch(voteAnecdote(changedAnecdote));
    const message = `You voted "${changedAnecdote.content}"`;
    dispatch(setNotification(message, 5000));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
