import axios from "axios";

const baseUrl = "/api/users";

export const getUsers = async () => 
  axios.get(baseUrl).then(res => res.data)

export const createUser = async (newUser) => 
  axios.post(baseUrl, newUser).then(res => res.data)

export const deleteUser = async (deletedUser) => {
  const id = deletedUser.id
  return axios.delete(`${baseUrl}/${id}`).then(res => res.data)
}

export const updateUser = async (updatedUser) => {
  const id = updatedUser.id
  return axios.put(`${baseUrl}/${id}`, updatedUser).then(res => res.data)
}