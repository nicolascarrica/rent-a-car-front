export interface CustomerFormData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  docType: string;
  docNumber: string;
  nationality: string;
  address: string;
  birthDate: string;
}

export interface CustomerEditData {
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  docType?: string;
  docNumber?: string;
  nationality?: string;
  address?: string;
  birthDate?: string;
}

export interface CarFormData {
  brand: string;
  model: string;
  kms: number;
  year: number;
  color: string;
  price: number;
  transmission: string;
  airConditioning?: boolean;
  reserved?: boolean;
}

export interface CarEditData {
  brand?: string;
  model?: string;
  kms?: number;
  year?: number;
  color?: string;
  price?: number;
  transmission?: string;
  airConditioning?: boolean;
  reserved?: boolean;
}