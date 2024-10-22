import axiosInstance from "./axios.Config";

export const fetchProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axiosInstance.get('/categories');
  return response.data;
};
