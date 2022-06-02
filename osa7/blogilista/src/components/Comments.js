const CommentForm = ({ addComment }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = { comment: event.target.comment.value };
    event.target.comment.value = "";
    addComment(comment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="comment" />
      <button type="submit">Add comment</button>
    </form>
  );
};

const Comments = ({ comments, addComment }) => {
  if (!comments) return <CommentForm addComment={addComment} />;

  return (
    <div>
      <CommentForm addComment={addComment} />
      {comments.length === 0 && <p><i>Be first to comment this blog</i></p>}
      <ul>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default Comments;
