import React, { useState, useEffect } from "react";
import { fetchSinglePost } from "../utils";
import { useParams } from "react-router-dom";
import PostCategories from "./PostCategories";
import CopyPostURL from "./CopyURL";
import Markdown from "./Markdown";

const DisplayPost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetchSinglePost("/api/posts/", id);
      setPost(post);
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <p>...loading...</p>;
  }

  return (
    <section className="post">
      <article>
        <h1>{post.title}</h1>
        <Markdown source={post.body} />
      </article>
      <CopyPostURL />
      <PostCategories categories={post.categories} />
    </section>
  );
};

export default DisplayPost;
