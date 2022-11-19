// inital state
const post = {
  params: {},
  posts: [],
};

export const postAction = {
  feed: "POST_FEED",
  append: "POST_APPEND",
  clearPosts: "POST_CLEAR_POSTS",
  clearParams: "POST_CLEAR_PARAMS",
  setParams: "POST_SET_PARAMS",
};

export const postReducer = (state = post, { type, payload }) => {
  switch (type) {
    case postAction.feed:
      return {
        ...state,
        posts: payload,
      };
    case postAction.append:
      return {
        ...state,
        posts: [...state.posts, ...payload],
      };
    case postAction.clearPosts:
      return {
        ...state,
        posts: [],
      };
    case postAction.setParams:
      return {
        ...state,
        params: payload,
      };
    case postAction.clearParams:
      return {
        ...state,
        params: {},
      };
    default:
      return state;
  }
};
