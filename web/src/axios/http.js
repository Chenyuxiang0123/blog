import axios from 'axios'

const http = axios.create({
  baseURL: 'https://www.server.cyxwblog.com/api/web'
  //baseURL: 'http://localhost:3000/api/web'
})

export default http