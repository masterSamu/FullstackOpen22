import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogsReducer(state, action) {
      return action.payload;
    },
    appendBlogsReducer(state, action) {
      state.push(action.payload);
    },
    removeBlogReducer(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    setBlogReducer(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    },
  },
});

export const {
  setBlogsReducer,
  appendBlogsReducer,
  removeBlogReducer,
  setBlogReducer,
} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch(setBlogsReducer(blogs.sort((a, b) => b.likes - a.likes)));
    console.log("initializing");
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogServices.create(blogObject);
    console.log(newBlog);
    dispatch(appendBlogsReducer(newBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    const deleted = await blogServices.deleteItem(id);
    if (deleted === "deleted") dispatch(removeBlogReducer(id));
  };
};

export const updateBlog = (id, blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogServices.update(id, blog);
    if (updatedBlog) dispatch(setBlogReducer(updatedBlog));
  };
};

export default blogSlice.reducer;
