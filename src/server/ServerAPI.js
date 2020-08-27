import axios from 'axios'

export default axios.create({
  baseURL: 'https://deploy-ecommerce.herokuapp.com/'
  // baseURL: 'http://localhost:3000/'
})
