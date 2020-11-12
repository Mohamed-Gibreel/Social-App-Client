import {
  SET_USER,
  SET_ERROS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload, //will bind all the intialState to their values that we get from the API.
      };
    default:
      return state;
  }
}
