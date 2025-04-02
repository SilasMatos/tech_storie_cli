import axiosInstance from "../service/axiosInstance";
import { Products, Suppliers, LoginCredentials } from "../types/types";
import Cookies from 'js-cookie'


export async function Login(payload: LoginCredentials) {
  const token = Cookies.get('accessToken')
  const response = await axiosInstance.post("/login", payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}



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


export async function UpdateProduct(id: string, payload: Products) {
  const token = Cookies.get('accessToken');
  const response = await axiosInstance.put(`/products/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export async function DeleteProduct(id: string) {
  const token = Cookies.get('accessToken');
  const response = await axiosInstance.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}