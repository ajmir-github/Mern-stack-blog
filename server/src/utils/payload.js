module.exports = (req, res, next) => {
  // this object is going to pass data
  // from one middleware to the other one
  req.payload = {
    _store: {},
    save(props) {
      this._store = {
        ...this._store,
        ...props,
      };
    },
    get(propsName) {
      return this._store[propsName];
    },
  };
  // get the auth token
  const authToken =
    req.cookies[process.env.AUTH_COOKIE_NAME || "auth"] ||
    req.headers["authorization"] ||
    req.headers["x-auth-token"];
  req.payload.save({ authToken });
  // proceed
  next();
};
