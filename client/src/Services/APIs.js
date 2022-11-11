// imports
import axios from "axios";
import { backend } from "./env.json";

// --------------------------------------
// ----------------- UTIL FUNCS
// --------------------------------------
// GET THE RELATIVE URL
function server(endpoint) {
  return backend + endpoint
}


// --------------------------------------
// ----------------- AUTH APIS
// --------------------------------------
// POST SIGN IN
export function signIn(user) {
  return axios.post(server("/auth/sign_in"), user);
}

// POST AUTHETICATE TOKEN
export function authToken(token) {
  return axios.post(server("/auth/auth_token"), { token });
}


// --------------------------------------
// ----------------- IMAGE APIS
// --------------------------------------

// UPLOAD AN IMAGE

// GET THE IMAGE RELATIVE URL
export function imageURL(imageName, size = null) {
  let str = "/image/" + imageName;
  if (size !== null) str += size;
  return server(str)
}



// --------------------------------------
// ----------------- USER APIS
// --------------------------------------

// GET USERS
export function getUser(params = { limit: 10, skip: 0 }) {
  return axios.get(server("/user"), { params });
}

// GET A Single USER
export function getSingleUser(userId) {
  return axios.get(server("/user/" + userId))
}

// CREATE A USER
export function signIn(user) {
  return axios.post(server("/user"), user);
}

// DELETE USER
export function deleteUser(token) {
  return axios.delete(server("/user/"), {
    headers: {
      Authorization: "token " + token
    }
  });
}

// UPDATE USER
export function updateUser(token, newProps) {
  return axios.patch(server("/user/"), newProps, {
    headers: {
      Authorization: "token " + token
    }
  });
}

// --------------------------------------
// ----------------- POST APIS
// --------------------------------------

// GET POSTS
export function getPost(params = { limit: 10, skip: 0 }) {
  return axios.get(server("/post"), { params });
}

// GET A Single POST
export function getSinglePost(postId) {
  return axios.get(server("/post/" + postId))
}

// CREATE A POST
export function signIn(post) {
  return axios.post(server("/post"), post);
}

// DELETE POST
export function deletePost(token) {
  return axios.delete(server("/post/"), {
    headers: {
      Authorization: "token " + token
    }
  });
}

// UPDATE POST
export function updatePost(token, newProps) {
  return axios.patch(server("/post/"), newProps, {
    headers: {
      Authorization: "token " + token
    }
  });
}