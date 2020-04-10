import React, { useState } from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import { request, convertToSelectOptions } from "../utils";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveAllPosts } from "../store/actions/actions";
import Markdown from "../components/Markdown";
import ReactMde from "react-mde";
import CreatableSelect from "react-select/creatable";

const AddPost = props => {
  const [buttonState, setButtonState] = useState(true);
  const [userCategories, setUserCategories] = useState([]);
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isReviewNeeded, setIsReviewNeeded] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const categoriesOptions = useSelector(state =>
    convertToSelectOptions(state.categories)
  );

  const savePost = async () => {
    const post = {
      body: markdown,
      title: title,
      categories: userCategories,
      is_public: isPublic,
      reviewed: !isReviewNeeded
    };
    const savePost = await request(
      "POST",
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
      setUserCategories([]);

      return;
    }

    const categories = selectedOptions.map(
      categoryOption => categoryOption.label
    );

    setUserCategories(categories);
  };

  const handlePublicCheckbox = () => {
    if (isReviewNeeded && isPublic) {
      setIsPublic(!isPublic);
      setIsReviewNeeded(!isReviewNeeded);

      return;
    }

    if (isReviewNeeded) {
      setIsPublic(!isPublic);

      return;
    }

    setIsPublic(!isPublic);
    setIsReviewNeeded(!isReviewNeeded);
  };

  const handleReviewCheckbox = () => {
    setIsReviewNeeded(!isReviewNeeded);
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
        <CreatableSelect
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
      <hr />
      <div>
        <p>Make public?</p>
        <input
          type="checkbox"
          onChange={handlePublicCheckbox}
          checked={isPublic}
        />
      </div>
      <div>
        <p>For review?</p>
        <input
          type="checkbox"
          onChange={handleReviewCheckbox}
          checked={isReviewNeeded}
          disabled={isPublic}
        />
      </div>
      <hr />
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
