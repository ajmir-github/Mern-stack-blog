// imports
import axios from "axios";

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
  return axios.delete(server("/user/"), { Headers: { Authorization: "token " + token } });
}

// UPDATE USER
export function updateUser(token, newProps) {
  return axios.patch(server("/user/"), newProps, { Headers: { Authorization: "token " + token } });
}

// --------------------------------------
// ----------------- POST APIS
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
  return axios.delete(server("/user/"), { Headers: { Authorization: "token " + token } });
}

// UPDATE USER
export function updateUser(token, newProps) {
  return axios.patch(server("/user/"), newProps, { Headers: { Authorization: "token " + token } });
}