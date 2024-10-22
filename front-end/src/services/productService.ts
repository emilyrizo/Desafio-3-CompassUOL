import { Product } from '../types/Product';
import axiosInstance from './axios.Config';


export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
