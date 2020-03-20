import React from "react";
import { deleteData } from "../utils";

const DeletePost = ({ postId }) => {
  const deletePost = () => {
    const confirmed = window.confirm("U sure?");

    if (confirmed) {
      deleteData(`/api/posts/${postId}`);
    }
    /* TODO refetch query after post deletion */
  };

  return <button onClick={deletePost}>delete</button>;
};

export default DeletePost;
