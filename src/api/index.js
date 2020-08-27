import axios from 'axios'

const server = axios.create({
  // baseURL: 'https://e-commerce-cms-idz.herokuapp.com'
  baseURL: 'http://localhost:3000'
})

export default server
