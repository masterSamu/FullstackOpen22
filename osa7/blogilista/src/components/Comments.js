import { Button, List, ListItem, TextField } from "@mui/material";

const CommentForm = ({ addComment }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = { comment: event.target.comment.value };
    event.target.comment.value = "";
    addComment(comment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField variant="standard" name="comment" />
      <Button variant="contained" type="submit">
        Add comment
      </Button>
    </form>
  );
};

const Comments = ({ comments, addComment }) => {
  if (!comments) return <CommentForm addComment={addComment} />;

  return (
    <div>
      <CommentForm addComment={addComment} />
      {comments.length === 0 && (
        <p>
          <i>Be first to comment this blog</i>
        </p>
      )}
      <List>
        {comments.map((comment) => {
          return <ListItem key={comment.id}>{comment.comment}</ListItem>;
        })}
      </List>
    </div>
  );
};

export default Comments;
