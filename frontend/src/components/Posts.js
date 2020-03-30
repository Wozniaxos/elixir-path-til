import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import "../App.css";

const Posts = () => {
  const posts = useSelector(state => state.posts);

  return (
    <div className="posts">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
