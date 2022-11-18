function capitalize(str) {
  let firstLetter = str.slice(0, 1).toUpperCase();
  let rest = str.slice(1);
  return firstLetter + rest;
}

module.exports = capitalize;
