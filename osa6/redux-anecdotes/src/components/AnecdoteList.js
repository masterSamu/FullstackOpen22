import { useSelector, useDispatch } from "react-redux";
import { addVoteToAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  deleteNotification,
} from "../reducers/notificationReducer";

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
    dispatch(addVoteToAnecdote(id));
    const votedAnecdote = anecdotes.find((a) => a.id === id);
    const message = `You voted "${votedAnecdote.content}"`;
    dispatch(createNotification(message));
    setTimeout(() => {
      dispatch(deleteNotification());
    }, 5000);
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
