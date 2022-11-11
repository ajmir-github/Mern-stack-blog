
module.exports = (req, res, next) => {
  req.payload = {
    _store: {},
    save(props) {
      this._store = {
        ...this._store,
        ...props
      }
    },
    get(propsName) {
      return this._store[propsName]
    }
  }
  next()
};