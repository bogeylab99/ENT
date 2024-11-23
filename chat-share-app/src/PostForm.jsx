import React, { useState } from "react";

const PostForm = ({ onAddPost }) => {
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { content: postContent, file: file ? URL.createObjectURL(file) : null };
    onAddPost(newPost);
    setPostContent("");
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind?"
      ></textarea>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
