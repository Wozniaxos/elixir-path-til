import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  saveSearchedPosts,
  saveSearchedQuery
} from "../store/actions/actions";
import { useOnRouteLeave } from "../utils/customHooks/useOnRouteLeave";

const Search = () => {
  const [input, setInput] = useState("");
  const [timeoutID, setTimeoutID] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const hasLeavedRoute = useOnRouteLeave("/search");

  useEffect(() => {
    if (hasLeavedRoute) {
      dispatch(saveSearchedQuery(""));
      setInput("");
    }
  }, [hasLeavedRoute, dispatch]);

  const handleInput = event => {
    const targetValue = event.target.value;

    setInput(targetValue);
    clearTimeout(timeoutID);

    dispatch(saveSearchedQuery(targetValue));

    if (targetValue) {
      const timeout = setTimeout(() => {
        history.push("/search");
        dispatch(saveSearchedPosts(targetValue));
      }, 300);
      setTimeoutID(timeout);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        value={input}
        onChange={handleInput}
      />
    </div>
  );
};

export default Search;
