import resolve from "./resolve";
import axios from "axios";
let apiBase = process.env.REACT_APP_API_BASEURL;

//login
export const userLogin = async (req) => {
  return await resolve(
    axios.post(apiBase + "auth/login", req).then((res) => res.data)
  );
};
