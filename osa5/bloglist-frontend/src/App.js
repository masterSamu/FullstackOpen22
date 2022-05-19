import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import "./styles/App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    setBlogs(blogs.sort((a, b) => b.likes - a.likes));
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logOut = () => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const blog = await blogService.create(blogObject);
      if (blog) {
        setBlogs(blogs.concat(blog));
        setNotification({
          type: "success",
          message: `New record "${blogObject.title}" by ${blogObject.author} saved.`,
        });
      }
    } catch (error) {
      setNotification({ type: "error", message: error.message });
    }
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  const updateBlog = async (id, newBlogObject) => {
    try {
      const returnedBlog = await blogService.update(id, newBlogObject);
      if (returnedBlog) {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
        setNotification({
          type: "success",
          message: `${newBlogObject.title} updated`,
        });
      }
    } catch (error) {
      setNotification({ type: "error", message: error.message });
    }
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  const deleteBlog = async (blogToDelete) => {
    try {
      const response = await blogService.deleteItem(blogToDelete.id);
      if (response === "deleted") {
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
        setNotification({
          type: "success",
          message: `${blogToDelete.title} deleted`,
        });
      }
    } catch (error) {
      setNotification({ type: "error", message: error.message });
    }
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  return (
    <div>
      {notification !== null && (
        <Notification
          type={notification?.type}
          message={notification?.message}
        />
      )}

      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Togglable buttonLabel="login">
            <LoginForm setUser={setUser} setNotification={setNotification} />
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={logOut}>logout</button>
          </p>
          <h3>Add new blog</h3>
          <Togglable buttonLabel="Create" ref={blogFormRef}>
            <AddBlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
