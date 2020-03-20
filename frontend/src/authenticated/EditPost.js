import React, { useState, useEffect } from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import {
  updateData,
  fetchSinglePost,
  convertToSelectOptions
} from "../utils";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Markdown from "../components/Markdown";
import ReactMde from "react-mde";
import Select from "react-select";

const EditPost = props => {
  const [buttonState, setButtonState] = useState(true);
  const [markdown, setMarkdown] = useState("");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const categoriesOptions = useSelector(state =>
    convertToSelectOptions(state.categories)
  );
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetchSinglePost("/api/posts/", id);

      setMarkdown(post.body);
      setTitle(post.title);
    };

    fetchPost();
  }, [id]);

  const updatePost = () => {
    const markdownPost = {
      body: markdown,
      title: title,
      categoriesIds: categories
    };
    const post = updateData(
      "/api/posts/" + id,
      JSON.stringify(markdownPost)
    );

    if (post) history.push(`/posts/${id}`);
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

    setCategories(categories);
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
          isMulti
          name="colors"
          options={categoriesOptions}
          onChange={handleSelect}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </form>
      <ReactMde
        classes={{ toolbar: "noShow" }}
        onChange={handleInput}
        value={markdown}
      />
      <button
        className="add-post"
        disabled={buttonState}
        onClick={updatePost}
      >
        update Post
      </button>
      <div className="preview">
        <Markdown source={markdown} />
      </div>
    </div>
  );
};

export default EditPost;
