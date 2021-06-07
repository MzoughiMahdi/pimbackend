import axios from "axios";

export const CLIENT_API = "http://localhost:5000/";

export const clientApi = axios.create({
  baseURL: CLIENT_API,
});
