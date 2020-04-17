import * as actionTypes from "../actionTypes";
import {
  fetchUser,
  fetchUserPosts,
  fetchData,
  fetchSearchedPosts
} from "../../utils";

// CATEGORIES
const getAllCategories = categories => ({
  type: actionTypes.GET_ALL_CATEGORIES,
  categories
});

export const saveAllCategories = () => async dispatch => {
  const categoriesArray = await fetchData("/api/categories");

  dispatch(getAllCategories(categoriesArray));
};

// USER
const getCurrentUser = currentUser => ({
  type: actionTypes.GET_CURRENT_USER,
  currentUser
});

export const saveCurrentUser = () => async dispatch => {
  let currentUser = await fetchUser("/api/me");

  if (currentUser.errors) {
    currentUser = false;
  }

  dispatch(getCurrentUser(currentUser));
};

export const deleteCurrentUser = () => ({
  type: actionTypes.DELETE_CURRENT_USER,
  currentUser: false
});

export const logOut = () => dispatch => {
  dispatch(deleteCurrentUser());
  dispatch(saveAllPosts());
};

export const getCurrentUserPosts = currentUserPosts => ({
  type: actionTypes.GET_CURRENT_USER_POSTS,
  currentUserPosts
});

export const saveCurrentUserPosts = id => async dispatch => {
  const posts = await fetchUserPosts("/api/users/", id);

  dispatch(getCurrentUserPosts(posts));
};

// ALL USERS WITH STATS
const getAllUsers = users => ({
  type: actionTypes.GET_ALL_USERS,
  users
});

export const saveAllUsers = () => async dispatch => {
  const allUsers = await fetchData("/api/statistics/users");

  dispatch(getAllUsers(allUsers));
};

// POSTS
const getPosts = posts => ({
  type: actionTypes.GET_ALL_POSTS,
  posts
});

export const saveAllPosts = () => async dispatch => {
  const allPosts = await fetchData("/api/posts");

  dispatch(getPosts(allPosts));
};

// SEARCHED POSTS

const getSerchedPosts = searchedPosts => ({
  type: actionTypes.GET_SEARCHED_POSTS,
  searchedPosts
});

export const saveSearchedPosts = query => async dispatch => {
  const searchedPosts = await fetchSearchedPosts(query);

  dispatch(getSerchedPosts(searchedPosts));
};

export const saveSearchedQuery = searchQuery => ({
  type: actionTypes.SEARCH_QUERY,
  searchQuery
});
