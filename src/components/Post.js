import React from "react";

import { createMarkup } from "../utils";

const Post = ({ html, title }) => {
  return (
    <section>
      <article>
        <hr />
        <h1>{title}</h1>
        <div className="post" dangerouslySetInnerHTML={createMarkup(html)} />
        <hr />
      </article>
    </section>
  );
};

export default Post;
