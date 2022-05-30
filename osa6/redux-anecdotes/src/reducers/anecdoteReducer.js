import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "APPEND_ANECDOTE":
      return [...state, action.data].sort((a, b) => b.votes - a.votes);
    case "SET_ANECDOTES":
      return action.data.anecdotes.sort((a, b) => b.votes - a.votes);
    case "UPDATE_ANECDOTE":
      const updatedAnecdote = action.data;
      return state
        .map((anecdote) => (anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    default:
      return state.sort((a, b) => b.votes - a.votes);
  }
};

export const appendAnecdote = (anecdote) => {
  return {
    type: "APPEND_ANECDOTE",
    data: anecdote,
  };
};

export const setAnecdotes = (anecdotes) => {
  return {
    type: "SET_ANECDOTES",
    data: { anecdotes },
  };
};

export const updateAnecdote = (anecdote) => {
  return {
    type: "UPDATE_ANECDOTE",
    data: anecdote
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default reducer;
