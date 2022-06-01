import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateBlog } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";

const BlogView = () => {
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const dispatch = useDispatch();

  if (!blog) return null;

  const handleLike = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id,
    };
    try {
        dispatch(updateBlog(id, newBlog));
        const message = `You liked "${newBlog.title}"`
        dispatch(createNotification({type: "success", message}, 5000))
    } catch (error) {
        dispatch(createNotification({type: "error", message: error.message, time: 5000}))
    }
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} <button onClick={handleLike}>Like</button>
      </p>
      <p>Added by {blog.author}</p>
      <ul>
        {blog.comments.map(comment => {
          return (
            <li key={comment.id}>{comment.comment}</li>
          )
        })}
      </ul>
    </div>
  );
};

export default BlogView;
