const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE_ANECDOTE":
      const id = action.data.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    case "NEW_ANECDOTE":
      return [...state, action.data].sort((a, b) => b.votes - a.votes);
    case "SET_ANECDOTES":
      return action.data.anecdotes.sort((a, b) => b.votes - a.votes);
    default:
      return state.sort((a, b) => b.votes - a.votes);
  }
};

export const addVoteToAnecdote = (id) => {
  return {
    type: "VOTE_ANECDOTE",
    data: { id },
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: "NEW_ANECDOTE",
    data: anecdote,
  };
};

export const setAnecdotes = (anecdotes) => {
  return {
    type: "SET_ANECDOTES",
    data: { anecdotes },
  };
};

export default reducer;
