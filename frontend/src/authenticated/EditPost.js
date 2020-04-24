import React, { useState, useEffect } from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import {
  request,
  fetchSinglePost,
  convertToSelectOptions
} from "../utils";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveAllPosts } from "../store/actions/actions";
import Markdown from "../components/Markdown";
import ReactMde from "react-mde";
import Select from "react-select";
import postSuccessToast from "../utils/toasts/postSuccessToast";

const EditPost = props => {
  const [buttonState, setButtonState] = useState(true);
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  // user categories as strings
  const [categories, setCategories] = useState([]);
  // select friendly categories used to pass to select options
  const [categoriesOptions, setCategoriesOptions] = useState("");
  // select friendly user options
  const [
    userCategoriesOptions,
    setUserCategoriesOptions
  ] = useState([]);
  // allCategories from redux in form {id: 1, name: "java"}
  const allCategories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetchSinglePost("/api/posts/", id);

      setMarkdown(post.body);
      setTitle(post.title);
      setCategories(post.categories);
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    setCategoriesOptions(convertToSelectOptions(allCategories));
  }, [allCategories]);

  useEffect(() => {
    const userCategories = allCategories.filter(category =>
      categories.includes(category.name)
    );
    const userCategoriesOptions = convertToSelectOptions(
      userCategories
    );

    setUserCategoriesOptions(userCategoriesOptions);
  }, [allCategories, categories]);

  const updatePost = async () => {
    const markdownPost = {
      body: markdown,
      title: title,
      categories: categories
    };
    const post = await request(
      "PATCH",
      "/api/me/posts/" + id,
      JSON.stringify(markdownPost)
    );

    if (post.ok) {
      dispatch(saveAllPosts());
      history.push(`/posts/${id}`);
      postSuccessToast("Post updated successfully");
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
    setButtonState(false);

    setTitle(event.target.value);
  };

  const handleSelect = selectedOptions => {
    setButtonState(false);

    if (!selectedOptions) {
      setCategories([]);

      return;
    }

    const categories = selectedOptions.map(obj => obj.label);

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
          value={userCategoriesOptions}
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
