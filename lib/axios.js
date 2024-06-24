import axios from "axios";

const instance = axios.create({
  baseURL: "https://linkbrary-api.vercel.app/6-5",
});

export default instance;
