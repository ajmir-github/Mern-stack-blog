// inital state
const post = {
  currentPage: 1,
  requestOptions: {},
  isEmpty: true,
  posts: [],
};

export const postAction = {
  feed: "POST_FEED",
  append: "POST_APPEND",
  clear: "POST_CLEAR",
};

export const postReducer = (state = post, { type, payload }) => {
  switch (type) {
    case postAction.feed:
      return {
        ...state,
        isEmpty: false,
        posts: payload,
      };
    case postAction.append:
      return {
        ...state,
        isEmpty: false,
        posts: [...state.posts, ...payload],
      };
    case postAction.clear:
      return {
        ...state,
        isEmpty: true,
        posts: [],
      };
    default:
      return state;
  }
};
