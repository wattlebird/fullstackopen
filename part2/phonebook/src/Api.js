import axios from 'axios'

const BaseUrl = "http://localhost:3001/persons"

const Api = {
  GetPhonebook: () => {
    return axios.get(`${BaseUrl}`).then(res => {
      return res.data
    })
  },
  CreatePhonebookItem: (itm) => {
    return axios.post(BaseUrl, itm).then(res => {
      return res.data
    })
  },
  UpdatePhonebookItem: (id, itm) => {
    return axios.put(`${BaseUrl}/${id}`, itm).then(res => {
      return res.data
    })
  },
  DeletePhonebookItem: (id) => {
    return axios.delete(`${BaseUrl}/${id}`).then(res => {
      return res.data
    })
  }
}

export default Api