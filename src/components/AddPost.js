import * as Showdown from "showdown";
import React, { useState } from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useHistory } from "react-router-dom";

const AddPost = props => {
  const [buttonState, setButtonState] = useState(true);
  const history = useHistory();
  const [input, setInput] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  const [title, setTitle] = useState("");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  const postData = async (url = "", data) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    });
    return response.ok;
  };

  const savePost = () => {
    const html = converter.makeHtml(input);
    const htmlObject = { html, title };
    const savePost = postData(
      "http://localhost:5000/posts",
      JSON.stringify(htmlObject)
    );
    if (savePost) {
      history.push("/posts");
    }
  };

  const handleInput = input => {
    setInput(input);
    if (input.length) setButtonState(false);
    else setButtonState(true);
  };

  const handleTitle = event => setTitle(event.target.value);

  return (
    <>
      <form>
        <label>
          Title:
          <input type="text" name="name" value={title} onChange={handleTitle} />
        </label>
      </form>
      <div className="container">
        <ReactMde
          value={input}
          onChange={handleInput}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          disablePreview={true}
        />
        <button className="add-post" disabled={buttonState} onClick={savePost}>
          Save Post If You're Happy With It :)
        </button>
      </div>
    </>
  );
};

export default AddPost;
