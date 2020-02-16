import axios from "axios";

const http = axios.create({
  //baseURL: 'https://www.server.cyxwblog.com/api/admin'
  baseURL: "http://localhost:3000/api/admin"
});

export default http;
