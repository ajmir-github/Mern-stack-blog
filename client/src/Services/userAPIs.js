import axios from "axios";

export async function signUpUser(user) {
  const userJson = JSON.stringify(user);
  return await axios.post("http://localhost:4000/excute",
    {
      code: `
        ("users").insertOne(${userJson})
      `
    }
  )
}