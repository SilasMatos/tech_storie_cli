import axiosInstance from "../service/axiosInstance";

import Cookies from 'js-cookie'

export async function getProducts() {
  const token = Cookies.get('accessToken')
  const response = await axiosInstance.get("/products", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}



export async function getSuppliers() {
  const token = Cookies.get('accessToken')
  const response = await axiosInstance.get("/suppliers", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}
