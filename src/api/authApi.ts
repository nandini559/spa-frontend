import api from "./axios";

export const loginUser = async (data : {
  userId: string;
  password: string
}) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
