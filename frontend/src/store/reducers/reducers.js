import * as actionTypes from "../actionTypes";

const initialState = {
  categories: [],
  currentUser: null,
  users: [],
  posts: []
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

    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
