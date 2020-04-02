import React from "react";
import { Link } from "react-router-dom";
import Markdown from "./Markdown";
import CopyPostURL from "./CopyURL";
import ReactionBar from "./ReactionBar";

const Post = props => {
  const { post } = props;

  return (
    <section className="post">
      <article>
        <Link to={`/posts/${post.id}`}>
          <h1>{post.title}</h1>
        </Link>
        <Markdown source={post.body} />
      </article>
      <CopyPostURL postId={post.id} />
      <ReactionBar post={post} />
    </section>
  );
};

export default Post;
