import React, { useState } from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const AddPost = props => {
  const [value, setValue] = useState("");
  const [buttonState, setButtonState] = useState(true);
  const [selectedTab, setSelectedTab] = useState("write");

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
    return await response.json();
  };

  const savePost = () => {
    const html = converter.makeHtml(value);
    const htmlObject = { html };
    postData("http://localhost:5000/posts", JSON.stringify(htmlObject));
  };

  const handleChange = string => {
    setValue(string);
    if (value) setButtonState(false);
    else setButtonState(true);
  };

  return (
    <>
      <div className="container">
        <ReactMde
          value={value}
          onChange={handleChange}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
        <button className="add-post" disabled={buttonState} onClick={savePost}>
          Save Post If You're Happy With It :)
        </button>
      </div>
    </>
  );
};

export default AddPost;
