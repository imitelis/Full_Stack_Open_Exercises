import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBlog = async (newObject) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const updateBlog = async (id, newObject) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

export default { getAll, createBlog, deleteBlog, updateBlog, setToken }