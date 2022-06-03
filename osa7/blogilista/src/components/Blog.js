import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TableRow, TableCell, Button } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";

const Blog = ({ blog, updateBlog }) => {
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

  return (
    <TableRow style={blogStyle} className="blog">
      <TableCell>
        <span style={titleStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </span>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
      <TableCell>
        <Button onClick={handleLike} startIcon={<ThumbUp />}>
          Like
        </Button>
      </TableCell>
    </TableRow>
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
