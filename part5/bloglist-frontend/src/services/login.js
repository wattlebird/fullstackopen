import axios from 'axios'

const userLogin = (username, password) => {
  return axios.post('/api/login', {
    username,
    password
  }).then(response => response.data)
}

export { userLogin }