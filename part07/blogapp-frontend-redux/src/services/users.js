import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

export default { getAll, getOne, createUser };
