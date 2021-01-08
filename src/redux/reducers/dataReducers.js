import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA } from "../types";

const initialState = {
  posts: [],
  post: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return { ...state, loading: true };
    case SET_POSTS:
      console.log(action.payload);
      return { ...state, posts: [...action.payload], loading: false };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      console.log(action.payload);
      state.posts[index] = action.payload;
      return { ...state };
    default:
      return state;
  }
}
