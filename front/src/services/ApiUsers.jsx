import axios from "axios";

const ApiUsers = axios.create({
  baseURL: "https://randomuser.me/api/",
});

export default ApiUsers;
