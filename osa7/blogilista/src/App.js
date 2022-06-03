import { useEffect, useRef } from "react";
import {
  Container,
  TableContainer,
  Paper,
  Table,
  TableBody,
} from "@mui/material";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import "./styles/App.css";
import { useDispatch, useSelector } from "react-redux";
import { createNotification } from "./reducers/notificationReducer";
import { setUser, logOutUser } from "./reducers/userReducer";
import {
  createBlog,
  initializeBlogs,
  removeBlog,
  updateBlog,
} from "./reducers/blogReducer";
import { Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import BlogsFromUser from "./components/BlogsFromUser";
import BlogView from "./components/BlogView";
import NavigationBar from "./components/NavigationBar";

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
        createNotification(
          {
            type: "success",
            message: `New record "${blogObject.title}" by ${blogObject.author} saved.`,
          },
          5000
        )
      );
    } catch (error) {
      dispatch(
        createNotification({ type: "error", message: error.message }, 5000)
      );
    }
  };

  const likeBlog = async (id, newBlogObject) => {
    try {
      dispatch(updateBlog(id, newBlogObject));
      dispatch(
        createNotification(
          {
            type: "success",
            message: `${newBlogObject.title} updated`,
          },
          5000
        )
      );
    } catch (error) {
      dispatch(
        createNotification({ type: "error", message: error.message }, 5000)
      );
    }
  };

  const deleteBlog = async (blogToDelete) => {
    dispatch(removeBlog(blogToDelete));
  };

  return (
    <Container>
      {user === null ? (
        <div>
          <Notification
            type={notification?.type}
            message={notification?.message}
          />
          <h2>Log in to application</h2>
          <Togglable buttonLabel="login">
            <LoginForm setUser={setUser} />
          </Togglable>
        </div>
      ) : (
        <div>
          <NavigationBar user={user} logOut={logOut} />
          <Notification
            type={notification?.type}
            message={notification?.message}
          />
          <h2>blogs</h2>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h3>Add new blog</h3>
                  <Togglable buttonLabel="Create" ref={blogFormRef}>
                    <AddBlogForm createBlog={addBlog} />
                  </Togglable>
                  <TableContainer component={Paper}>
                    <Table aria-label="blog table">
                      <TableBody>
                        {blogs.map((blog) => (
                          <Blog
                            key={blog.id}
                            blog={blog}
                            updateBlog={likeBlog}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              }
            />

            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<BlogsFromUser />} />
            <Route
              path="/blogs/:id"
              element={<BlogView deleteBlog={deleteBlog} />}
            />
          </Routes>
        </div>
      )}
    </Container>
  );
};

export default App;
