import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";
import { createNotification } from "./notificationReducer";

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
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogServices.create(blogObject);
    dispatch(appendBlogsReducer(newBlog));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const id = blog.id;
      const response = await blogServices.deleteItem(id);
      if (response === "deleted") {
        dispatch(removeBlogReducer(id));
        dispatch(
          createNotification(
            {
              type: "success",
              message: `${blog.title} from ${blog.author} deleted successfully`,
            },
            5000
          )
        );
      }
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(
          createNotification(
            {
              type: "error",
              message:
                "Unauthorized user to delete this blog. Only creator can delete blog.",
            },
            5000
          )
        );
      } else {
        dispatch(
          createNotification({ type: "error", message: error.message }, 5000)
        );
      }
    }
  };
};

export const updateBlog = (id, blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogServices.update(id, blog);
    if (updatedBlog) dispatch(setBlogReducer(updatedBlog));
  };
};

export const addCommentToBlog = (id, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogServices.commentBlog(id, comment);
    if (commentedBlog) dispatch(setBlogReducer(commentedBlog));
  };
};

export default blogSlice.reducer;
