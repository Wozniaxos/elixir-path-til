import React from "react";

const PostCategories = ({ categories }) => {
  return categories.map((category, index) => (
    <p key={index}>{category}</p>
  ));
};

export default PostCategories;
