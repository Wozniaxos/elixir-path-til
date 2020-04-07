import React, { useState } from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import { postData, convertToSelectOptions } from "../utils";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveAllPosts } from "../store/actions/actions";
import Markdown from "../components/Markdown";
import ReactMde from "react-mde";
import Select from "react-select";

const AddPost = props => {
  const [buttonState, setButtonState] = useState(true);
  const [userCategories, setUserCategories] = useState([]);
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const categoriesOptions = useSelector(state =>
    convertToSelectOptions(state.categories)
  );

  const savePost = async () => {
    const post = {
      body: markdown,
      title: title,
      categoryIds: userCategories
    };
    const savePost = await postData(
      "/api/posts",
      JSON.stringify(post)
    );

    if (savePost) {
      history.push("/");
      dispatch(saveAllPosts());
    }
  };

  const handleInput = input => {
    setMarkdown(input);

    if (input.length) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  };

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const handleSelect = selectedOptions => {
    if (!selectedOptions) {
      return;
    }

    const categories = selectedOptions.map(obj => obj.value);

    setUserCategories(categories);
  };

  return (
    <div className="container">
      <form className="add-post-title">
        <label>
          Title:
          <input
            type="text"
            name="name"
            value={title}
            onChange={handleTitle}
          />
        </label>
        <Select
          className="basic-multi-select"
          classNamePrefix="select"
          isMulti
          name="colors"
          onChange={handleSelect}
          options={categoriesOptions}
        />
      </form>
      <ReactMde
        classes={{ toolbar: "noShow" }}
        onChange={handleInput}
        value={markdown}
      />
      <div className="preview">
        <Markdown source={markdown} />
      </div>
      <button
        className="add-post"
        disabled={buttonState}
        onClick={savePost}
      >
        Save Post
      </button>
    </div>
  );
};

export default AddPost;
