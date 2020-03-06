import React, { useState } from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useHistory } from "react-router-dom";

import Markdown from "./Markdown";
import { postData } from "../utils";

const AddPost = props => {
  const [buttonState, setButtonState] = useState(true);
  const history = useHistory();
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");

  const savePost = () => {
    const markdownPost = { markdown, title };
    const savePost = postData(
      "http://localhost:5000/posts",
      JSON.stringify(markdownPost)
    );
    if (savePost) history.push("/posts");
  };

  const handleInput = input => {
    setMarkdown(input);
    if (input.length) setButtonState(false);
    else setButtonState(true);
  };

  const handleTitle = event => setTitle(event.target.value);

  return (
    <div className="container">
      <form className="add-post-title">
        <label>
          Title:
          <input type="text" name="name" value={title} onChange={handleTitle} />
        </label>
      </form>
      <ReactMde
        classes={{ toolbar: "noShow" }}
        onChange={handleInput}
        value={markdown}
      />
      <button className="add-post" disabled={buttonState} onClick={savePost}>
        Save Post If You're Happy With It :)
      </button>
      <div className="preview">
        <Markdown source={markdown} />
      </div>
    </div>
  );
};

export default AddPost;
