import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const createUser = async (data : any) => {
  const response = await axios.post(`${BASE_URL}/users`, data);

  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);

  return response.data;
};
