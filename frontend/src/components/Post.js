import React from "react";
import { Link } from "react-router-dom";
import Markdown from "./Markdown";
import CopyPostURL from "./CopyURL";
import DeletePost from "../authenticated/DeletePost";

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
      <Link to={`/edit-post/${post.id}`}>
        <button>edit</button>
      </Link>
      <DeletePost postId={post.id} />
    </section>
  );
};

export default Post;
