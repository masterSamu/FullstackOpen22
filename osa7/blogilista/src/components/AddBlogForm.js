import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, InputLabel, TextField } from "@mui/material";

export default function AddBlogForm({ createBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <InputLabel htmlFor="title">title:</InputLabel>
        <TextField
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Title"
          id="title"
        />
      </div>
      <div>
        <InputLabel htmlFor="author">author:</InputLabel>
        <TextField
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Author"
          id="author"
        />
      </div>
      <div>
        <InputLabel htmlFor="url">url:</InputLabel>
        <TextField
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Url"
          id="url"
        />
      </div>
      <Button variant="contained" color="success" type="submit">
        Create
      </Button>
    </form>
  );
}

AddBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};
