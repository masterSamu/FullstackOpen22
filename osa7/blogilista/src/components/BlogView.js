import { Button } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { addCommentToBlog, updateBlog } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";
import Comments from "./Comments";
import { useState } from "react";

const BlogView = ({ deleteBlog }) => {
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const dispatch = useDispatch();

  if (!blog) return null;

  const handleDelete = () => {
    deleteBlog(blog);
  };

  const handleLike = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id,
      comments: blog.comments,
    };
    try {
      dispatch(updateBlog(id, newBlog));
      const message = `You liked "${newBlog.title}"`;
      dispatch(createNotification({ type: "success", message }, 5000));
    } catch (error) {
      dispatch(
        createNotification(
          {
            type: "error",
            message: error.message,
          },
          5000
        )
      );
    }
  };

  const addComment = async (comment) => {
    try {
      dispatch(addCommentToBlog(blog.id, comment));
      const message = `Your comment is saved to "${blog.title}"`;
      dispatch(createNotification({ type: "success", message }, 5000));
    } catch (error) {
      dispatch(
        createNotification(
          {
            type: "error",
            message: error.message,
          },
          5000
        )
      );
    }
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes}{" "}
        <Button onClick={handleLike} startIcon={<ThumbUp />}>
          Like
        </Button>
      </p>
      <p>Added by {blog.user.username}</p>
      <Button variant="outlined" color="error" onClick={handleDelete}>
        Delete
      </Button>
      <Comments comments={blog.comments} addComment={addComment} />
    </div>
  );
};

export default BlogView;
