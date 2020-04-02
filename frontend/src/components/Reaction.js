import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleReaction, checkHasReacted } from "../utils";
import { saveAllPosts } from "../store/actions/actions";

const Reaction = props => {
  const { id } = props.post;
  const { type, whoReacted } = props.reaction;
  const [hasReacted, setHasReacted] = useState(false);
  const [reactionNumber, setReactionNumber] = useState(0);
  const user = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const didReact = checkHasReacted(whoReacted, user.uuid);

      setHasReacted(didReact);
      setReactionNumber(whoReacted.length);
    }
  }, [user, whoReacted]);

  const toggleReaction = async () => {
    if (hasReacted) {
      await handleReaction(id, "DELETE", type)
        .then(() => {
          setHasReacted(!hasReacted);
          setReactionNumber(reactionNumber - 1);
          dispatch(saveAllPosts());
        })
        .catch(err => console.error(err));
    } else {
      await handleReaction(id, "POST", type)
        .then(() => {
          setHasReacted(!hasReacted);
          setReactionNumber(reactionNumber + 1);
          dispatch(saveAllPosts());
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <p onClick={toggleReaction}>
      {type}: {reactionNumber}
    </p>
  );
};

export default Reaction;
