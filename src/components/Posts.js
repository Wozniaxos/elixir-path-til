import React, { useState, useEffect } from "react";
import "../App.css";

const Posts = props => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(
      "http://localhost:5000/posts?_sort=id&_order=DESC"
    );
    const body = await response.json();
    console.log({ body });
    const postsHtml = body.map(postObject => postObject.html);
    setPosts(postsHtml);
  };

  const createMarkup = html => {
    return { __html: html };
  };

  const postsList = posts.map(html => {
    return (
      <div>
        <hr />
        <div className="post" dangerouslySetInnerHTML={createMarkup(html)} />
        <hr />
      </div>
    );
  });

  return <div className="posts">{postsList}</div>;
};

export default Posts;
