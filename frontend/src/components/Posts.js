import React, { useState, useEffect } from "react";
import Post from "./Post";
import "../App.css";

const Posts = props => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch("/api/posts")
      .catch(error =>
        console.error("Error:", error)
      );

    if (!response) {
      return;
    }
    const fetchedPosts = await response.json();

    // TODO  setPosts(fetchedPosts);
  };

  return (
    <div className="posts">
      <>
        <p>posts listed here</p>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </>
    </div>
  );
};

export default Posts;
