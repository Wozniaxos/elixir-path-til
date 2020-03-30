import * as actionTypes from "../actionTypes";
import { fetchUser, fetchData } from "../../utils";

const getAllCategories = categories => ({
  type: actionTypes.GET_ALL_CATEGORIES,
  categories
});

export const saveAllCategories = () => async dispatch => {
  const categoriesArray = await fetchData("/api/categories");

  dispatch(getAllCategories(categoriesArray));
};

const getCurrentUser = currentUser => ({
  type: actionTypes.GET_CURRENT_USER,
  currentUser
});

export const saveCurrentUser = () => async dispatch => {
  const currentUser = await fetchUser("/api/me");

  dispatch(getCurrentUser(currentUser));
};

export const saveAllUsers = () => async dispatch => {
  const allUsers = await fetchData("/api/users");

  dispatch(getAllUsers(allUsers));
};
const getAllUsers = users => ({
  type: actionTypes.GET_ALL_USERS,
  users
});

const getPosts = posts => ({
  type: actionTypes.GET_ALL_POSTS,
  posts
});

export const saveAllPosts = () => async dispatch => {
  const allPosts = await fetchData("/api/posts");

  dispatch(getPosts(allPosts));
};
