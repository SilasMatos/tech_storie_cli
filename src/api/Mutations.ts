import axiosInstance from "../service/axiosInstance";
import { Products, Suppliers } from "../types/types";
import Cookies from 'js-cookie'

export async function InsertProducts(payload: Products) {
  const token = Cookies.get('accessToken')
  const response = await axiosInstance.post('/products', payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}


export async function InsertSupplier(payload: Suppliers) {
  const token = Cookies.get('accessToken')
  const response = await axiosInstance.post("/suppliers", payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}


