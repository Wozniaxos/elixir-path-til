import React, { useEffect, useState } from "react";
import Reaction from "./Reaction";
import { convertReactions } from "../utils";

const ReactionBar = ({ post }) => {
  const [reactions, setReactions] = useState();

  useEffect(() => {
    const reactionArray = convertReactions(post.reactions);
    setReactions(reactionArray);
  }, [post.reactions]);

  if (!reactions) return null;

  return reactions.map(reaction => (
    <Reaction
      post={post}
      reaction={reaction}
      key={reaction.type}
    />
  ));
};

export default ReactionBar;
