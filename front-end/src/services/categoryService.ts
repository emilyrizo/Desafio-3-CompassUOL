import { Category } from '../types/Category';
import axiosInstance from './axios.Config';

export const getCategories = async (): Promise<Category[]> => { 
  try {
    const response = await axiosInstance.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
