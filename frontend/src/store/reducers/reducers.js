import * as actionTypes from "../actionTypes";

const initialState = {
  categories: [],
  currentUser: null,
  users: [],
  posts: [],
  searchedPosts: [],
  searchQuery: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };

    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
      };

    case actionTypes.GET_CURRENT_USER_POSTS:
      return {
        ...state,
        currentUserPosts: action.currentUserPosts
      };

    case actionTypes.DELETE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
      };

    case actionTypes.GET_ALL_USERS:
      return {
        ...state,
        users: action.users
      };

    case actionTypes.GET_ALL_POSTS:
      return {
        ...state,
        posts: action.posts
      };

    case actionTypes.GET_SEARCHED_POSTS:
      return {
        ...state,
        searchedPosts: action.searchedPosts
      };

    case actionTypes.SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery
      };

    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
