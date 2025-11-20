import axios from 'axios'

// axios instance with base config
const client = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000, // 10s timeout seems reasonable
  headers: {
    'Content-Type': 'application/json',
  },
})

// normalize error messages so components don't have to deal with axios specifics
client.interceptors.response.use(
  (response) => response,
  (error) => {
    // try to get a useful error message from various places
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Unable to reach the Fake Store API.'
    return Promise.reject(new Error(message))
  },
)

export default client

