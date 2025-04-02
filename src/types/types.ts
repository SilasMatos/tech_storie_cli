export type Product = {
  produto: string;
  valor: number;
  cadastro: string;
};
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Products {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  supplier?: number;
  createdBy?: number;
}

export interface Suppliers {
  id: number
  name: string
  contactInfo: string,
  createdat: string,
  updatedat: string,
  createdAt: string
  updatedAt: string
}
