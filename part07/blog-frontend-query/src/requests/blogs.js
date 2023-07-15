import axios from 'axios'

const baseUrl = "/api/blogs"

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getBlogs = async () => 
  axios.get(baseUrl).then(res => res.data)

export const createBlog = async (newBlog) => {
  const config = {
    headers: { authorization: token },
  }
  return axios.post(baseUrl, newBlog, config).then(res => res.data)
}

export const deleteBlog = async (deletedBlog) => {
  const config = {
    headers: { authorization: token },
  }
  const id = deletedBlog.id
  return axios.delete(`${baseUrl}/${id}`, config).then(res => res.data)
}

export const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { authorization: token },
  };
  const id = updatedBlog.id
  return await axios.put(`${baseUrl}/${id}`, updatedBlog, config).then(res => res.data)
};