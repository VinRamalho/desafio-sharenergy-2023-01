import axios from "axios";

export const ApiLogin = axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth/login",
});

export const createSession = async (login, passwords) => {
  console.log(passwords);
  return await ApiLogin.post("/", { login: login, password: passwords });
};
