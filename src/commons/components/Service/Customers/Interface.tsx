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

export interface ReservationFormData{
  startDate: Date;
  endDate: Date;
  paymentMethod: string;
  statusId: string;
  carId: number;
  userId: number;
}

export interface ReservationEditData{
  startDate?: string;
  endDate?: string;
  pricePerDay?: number;
  paymentMethod?: string;
  statusId?: string;
  carId?: number;
  userId?: number;
}


export interface IsummData {
  icon: string;
  text: string;
  amount: string;
  currency: string;
}