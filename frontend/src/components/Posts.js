import React, { useState, useEffect } from "react";
import Post from "./Post";
import { fetchData } from "../utils";
import "../App.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await fetchData("/api/posts");

      setPosts(posts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
