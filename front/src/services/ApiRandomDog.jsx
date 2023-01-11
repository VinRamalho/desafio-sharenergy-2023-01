import axios from "axios";

const ApiRandomDog = axios.create({
  baseURL: "https://random.dog/woof.json/",
});

export default ApiRandomDog;
