import * as actionTypes from "../actionTypes";
import { fetchData } from "../../utils";

const getAllCategories = categories => {
  return {
    type: actionTypes.GET_ALL_CATEGORIES,
    categories
  };
};

export const saveAllCategories = () => {
  return async dispatch => {
    const categoriesArray = await fetchData("/api/categories");

    dispatch(getAllCategories(categoriesArray));
  };
};
