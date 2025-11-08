import { httpAxios } from "../helper/httpHelper";

export async function addUser(user) {
  if (!user) throw new Error("No User provided");
  const res = await httpAxios.post("/api/user", user);
  return res.data
}
// export default addUser

export async function loginUSer(loginDetails) {
  if (!loginDetails) throw new Error("login not done");
  const res = await httpAxios.post("/api/login", loginDetails);
  return res.data
}
// export default loginUSer

export async function logoutUSer() {
  // if (!loginDetails) throw new Error("login not done");
  const res = await httpAxios.post("/api/logout");
  return res.data
}