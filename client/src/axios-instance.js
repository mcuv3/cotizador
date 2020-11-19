import axios from "axios";
let BASE_URL = "http://localhost:5000/api";

if (process.env.NODE_ENV !== "development")
  BASE_URL = "http://ec2-18-188-254-9.us-east-2.compute.amazonaws.com:5000/api";

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
