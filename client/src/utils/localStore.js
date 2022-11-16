// ------------------------------
// LOCALSTORAGE FUNCTIONS
// ------------------------------

export function addToLocalStore(data = {}) {
  const store = getLocalStore();
  localStorage.setItem(storeName, JSON.stringify({ ...store, ...data }));
}

export function formatDate(date) {
  const d = new Date(date).toString().split(" ");
  return `${d[1]} ${d[2]}, ${d[3]}`;
}
