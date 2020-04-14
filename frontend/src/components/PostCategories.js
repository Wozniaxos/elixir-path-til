import React from "react";

const PostCategories = ({ categories }) => {
  if (!categories) {
    return null;
  }

  return categories.map((category, index) => (
    <p key={index}>{category}</p>
  ));
};

export default PostCategories;
