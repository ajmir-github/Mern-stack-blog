// inital state
const post = {
  params: {},
  posts: [],
};

export const postAction = {
  feed: "POST_FEED",
  append: "POST_APPEND",
  clear: "POST_CLEAR",
  update: "POST_UPDATE",
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
    case postAction.clear:
      return {
        ...state,
        posts: [],
      };
    case postAction.update:
      return {
        ...state,
        params: payload,
      };
    default:
      return state;
  }
};
