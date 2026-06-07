import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const createRecord = async (data : any) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN SENT =", token);

  const response = await axios.post(`${BASE_URL}/records`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const getRecords = async () => {
  const response = await axios.get(`${BASE_URL}/records`);

  return response.data;
};
