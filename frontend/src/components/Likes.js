import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { handleLike, checkHasLiked } from "../utils";

const Likes = props => {
  const { likesCount, id, likes } = props.post;
  const userId = useSelector(state => {
    if (!state.currentUser) {
      return null;
    } else {
      return state.currentUser.uuid;
    }
  });
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [hasLiked, setHasLiked] = useState(null);

  useEffect(() => {
    const didLike = checkHasLiked(likes, userId);

    setHasLiked(didLike);
  }, [likes, userId]);

  const toggleLike = async () => {
    if (hasLiked) {
      await handleLike(id, "DELETE")
        .then(() => {
          setHasLiked(!hasLiked);
          setLikesNumber(likesNumber - 1);
        })
        .catch(err => console.error(err));
    } else {
      await handleLike(id, "POST")
        .then(() => {
          setHasLiked(!hasLiked);
          setLikesNumber(likesNumber + 1);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <button onClick={toggleLike}>
      Likes: {likesNumber} You {hasLiked ? "like" : "dont like"} it!
    </button>
  );
};

export default Likes;
