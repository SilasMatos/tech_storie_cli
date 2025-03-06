import axiosInstance from "../service/axiosInstance";
import { Products, searchOfferstype } from "../types/types";
import Cookies from 'js-cookie'

export async function InsertProducts(payload: Products) {
  const token = Cookies.get('accessToken')
  const response = await axiosInstance.post("/atendimentos", payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}


