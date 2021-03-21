import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (param, token) => {
  return axios.post(baseUrl, param, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => 
    response.data
  )
}

const deleteBlog = (id, token) => {
  return axios.delete(`${baseUrl}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

const updateBlog = (id, content, token) => {
  return axios.put(`${baseUrl}/${id}`, content, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => 
    response.data
  )
}

export { getAll, createBlog, deleteBlog, updateBlog }