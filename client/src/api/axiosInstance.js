import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ecommerce-server-ichlas.herokuapp.com'
})

export default instance
