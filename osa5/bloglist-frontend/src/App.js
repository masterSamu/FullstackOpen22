import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import "./styles/App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
          <LoginForm setUser={setUser} setNotification={setNotification} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={logOut}>logout</button>
          </p>
          <h3>Add new blog</h3>
          <AddBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setNotification={setNotification}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
