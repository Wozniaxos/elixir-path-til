import React from "react";
import Markdown from "./Markdown";

const Post = ({ markdown, title }) => {
  return (
    <section>
      <article>
        <hr />
        <h1>{title}</h1>
        <Markdown source={markdown} />
        <hr />
      </article>
    </section>
  );
};

export default Post;
