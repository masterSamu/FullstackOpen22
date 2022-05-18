import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [isExpanded, setExpanded] = useState(false);

  const styleWhenExpanded = { display: isExpanded ? "" : "none" };
  const buttonText = isExpanded ? "Hide" : "Expand";

  const handleLike = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id,
    };
    updateBlog(blog.id, newBlog);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (confirm) deleteBlog(blog);
  };

  return (
    <div style={blogStyle}>
      <span style={titleStyle}>{blog.title}</span>
      <button onClick={() => setExpanded(!isExpanded)}>{buttonText}</button>
      <div style={styleWhenExpanded}>
        <div>Author: {blog.author}</div>
        <div>Url: {blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>User: {blog.user.name}</div>
        <button onClick={handleDelete}>Remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
};

export default Blog;

const blogStyle = {
  padding: 10,
  paddingLeft: 4,
  border: "solid",
  borderWidth: 1,
  marginBottom: 4,
  marginTop: 4,
};

const titleStyle = {
  fontWeight: "bold",
  paddingRight: 15,
};
