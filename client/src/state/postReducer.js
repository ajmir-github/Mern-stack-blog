// inital state
const post = {
  params: {},
  posts: [],
  keywords: [],
};

export const postAction = {
  feed: "POST_FEED",
  append: "POST_APPEND",
  clearPosts: "POST_CLEAR_POSTS",
  clearParams: "POST_CLEAR_PARAMS",
  setParams: "POST_SET_PARAMS",
  feedKeywords: "POST_FEED_KEYWORDS",
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
      let preParams = { ...state.params, ...payload };
      let params = {};
      Object.entries(preParams).forEach(([key, value]) => {
        if (!!value) params[key] = value;
      });
      return {
        ...state,
        params,
      };
    case postAction.clearParams:
      return {
        ...state,
        params: {},
      };
    case postAction.feedKeywords:
      return {
        ...state,
        keywords: payload,
      };
    default:
      return state;
  }
};
