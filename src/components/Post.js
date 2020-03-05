import React from "react";

const Post = ({ html, title }) => {
  const createMarkup = html => {
    return { __html: html };
  };
  console.log(html);

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
