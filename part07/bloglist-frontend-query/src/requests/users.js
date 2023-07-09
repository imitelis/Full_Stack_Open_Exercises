import axios from "axios";

const baseUrl = "/api/users";

export const getUsers = async () => 
  axios.get(baseUrl).then(res => res.data)

export const getUser = async (id) =>
  axios.get(`${baseUrl}/${id}`).then(res => res.data)

export const createUser = async (newUser) => 
  axios.post(baseUrl, newUser).then(res => res.data)

export const deleteUser = async (id) =>
  axios.delete(`${baseUrl}/${id}`).then(res => res.data)

export const updateUser = async (id, newObject) => 
  axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data)
