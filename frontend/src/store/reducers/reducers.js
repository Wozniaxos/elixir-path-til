import * as actionTypes from "../actionTypes";

const initialState = {
  categories: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };

    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
