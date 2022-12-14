// imports
import axios from "axios";
// ----------------- Globel Vars
// const baseURL = "http://10.0.0.65:4000";
const baseURL = "http://localhost:4000";

// ----------------- AUTH HEADER TOKEN
// get the toke from the client cookie object
const server = axios.create({
  withCredentials: true,
  baseURL,
});

// ----------------- IMAGE APIS
// UPLOAD AN IMAGE
export function uploadImage(formData, setProgress) {
  // main func
  return server.post("/image", formData, {
    onUploadProgress: (e) => {
      setProgress(Math.floor((e.loaded / e.total) * 100));
    },
  });
}

// DELETE AN IMAGE
export function deleteImage(imageURL) {
  return server.delete(imageURL);
}

// GET THE IMAGE RELATIVE URL
export function imageURL(imageURL, size = null) {
  if (size !== null) imageURL += "?size=" + size;
  return baseURL + imageURL;
}

// ----------------- AUTH APIS
// POST SIGN IN
export function signIn(user) {
  return server.post("/auth/sign_in", user);
}

// POST AUTHETICATE TOKEN
export function authToken(token) {
  // return server.post("/auth/verify_token", { token });
  return server.post("/auth/verify_token");
}

// ----------------- USER APIS

// GET USERS
export function getUser(params = { limit: 10, skip: 0 }) {
  return server.get("/user", { params });
}

// GET A Single USER
export function getSingleUser(userId) {
  return server.get("/user/" + userId);
}

// CREATE A USER
export function signUp(user) {
  return server.post("/user", user);
}

// DELETE USER
export function deleteUser() {
  return server.delete("/user/");
}

// UPDATE USER
export function updateUser(newProps) {
  return server.patch("/user/", newProps);
}

// setTimeout(async () => {
//   // console.log(await server.post("/test"))
//   console.log(
//     await server.post("/test", {
//       fullName: "Ajmir Raziqi",
//     })
//   );
// }, 1000);

// ----------------- POST APIS

// GET POSTS
export function getPost(params = { limit: 10, skip: 0 }) {
  return server.get("/post", { params });
}

// GET A Single POST
export function getSinglePost(postId) {
  return server.get("/post/" + postId);
}

// CREATE A POST
export function createPost(post) {
  return server.post("/post", post);
}

// DELETE POST
export function deletePost(postId) {
  return server.delete("/post/" + postId);
}

// UPDATE POST
export function updatePost(postId, newProps) {
  return server.patch("/post/" + postId, newProps);
}

// ----------------- UTIL APIS
// UPDATE POST
export function getUtilKeywords() {
  return server.get("/util/keywords");
}
