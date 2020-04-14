import React from "react";
import { Link } from "react-router-dom";
import PostCategories from "./PostCategories";
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
      <PostCategories categories={post.categories} />
      <ReactionBar post={post} />
    </section>
  );
};

export default Post;
