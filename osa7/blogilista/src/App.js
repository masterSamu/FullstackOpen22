import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import "./styles/App.css";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { setUser, logOutUser } from "./reducers/userReducer";
import {
  createBlog,
  initializeBlogs,
  removeBlog,
  updateBlog,
} from "./reducers/blogReducer";
import { Routes, Route } from "react-router-dom";
import Users from "./components/Users";

const App = () => {
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const userFromLocalStorage = JSON.parse(loggedUserJSON);
      dispatch(setUser(userFromLocalStorage));
      blogService.setToken(userFromLocalStorage.token);
    }
  }, [dispatch]);

  const logOut = () => {
    dispatch(logOutUser());
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      dispatch(createBlog(blogObject));
      dispatch(
        setNotification({
          type: "success",
          message: `New record "${blogObject.title}" by ${blogObject.author} saved.`,
        })
      );
    } catch (error) {
      dispatch(setNotification({ type: "error", message: error.message }));
    }
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 6000);
  };

  const likeBlog = async (id, newBlogObject) => {
    try {
      dispatch(updateBlog(id, newBlogObject));
      dispatch(
        setNotification({
          type: "success",
          message: `${newBlogObject.title} updated`,
        })
      );
    } catch (error) {
      dispatch(setNotification({ type: "error", message: error.message }));
    }
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 6000);
  };

  const deleteBlog = async (blogToDelete) => {
    try {
      dispatch(removeBlog(blogToDelete.id));
      dispatch(
        setNotification({
          type: "success",
          message: `${blogToDelete.title} deleted`,
        })
      );
    } catch (error) {
      dispatch(setNotification({ type: "error", message: error.message }));
    }
    setTimeout(() => {
      dispatch(setNotification(null));
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
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h3>Add new blog</h3>
                  <Togglable buttonLabel="Create" ref={blogFormRef}>
                    <AddBlogForm createBlog={addBlog} />
                  </Togglable>
                  {blogs.map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      updateBlog={likeBlog}
                      deleteBlog={deleteBlog}
                    />
                  ))}
                </>
              }
            />

            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
