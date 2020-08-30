import axios from 'axios'

const server = axios.create({
  // baseURL: 'https://e-commerce-cms-idz.herokuapp.com'
  baseURL: 'http://localhost:3000'
})

export default server

// * Client-Side-Customer Deploy Link:
//     https://e-commerce-cms-customer.web.app/

// -----