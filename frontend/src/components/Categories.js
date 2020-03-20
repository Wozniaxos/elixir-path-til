import React from "react";
import { useSelector } from "react-redux";

const Categories = props => {
  const categories = useSelector(state => state.categories);

  return categories.map(categorie => <p>{categorie.name}</p>);
};

export default Categories;
