import React, { useState, useEffect } from "react";

import Post from "./Post";
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
    const fetchedPosts = await response.json();
    setPosts(fetchedPosts);
  };

  return (
    <div className="posts">
      {posts.map(postObject => (
        <Post key={postObject.id} {...postObject} />
      ))}
    </div>
  );
};

export default Posts;
