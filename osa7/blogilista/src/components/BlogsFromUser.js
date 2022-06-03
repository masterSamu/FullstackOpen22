import { List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const User = ({ user }) => {
  if (!user) return null;
  return <h1>{user.name}</h1>;
};

const BlogsFromUser = () => {
  const id = useParams().id;
  const blogs = useSelector((state) =>
    state.blogs.filter((blog) => blog.user.id === id)
  );
  const user = blogs[0]?.user;

  return (
    <div>
      <User user={user} />
      <h2>Added Blogs</h2>
      <List>
        {blogs.map((blog) => {
          return (
            <ListItem key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default BlogsFromUser;
