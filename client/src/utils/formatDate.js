export default function formatDate(date) {
  const d = new Date(date).toString().split(" ");
  return `${d[1]} ${d[2]}, ${d[3]}`;
}
