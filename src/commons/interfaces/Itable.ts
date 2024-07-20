export interface ITopCustomers extends Object {
  username: string;
  order: number;
  price: string;
}

export type ILatestTransactions = {
  orderId: string;
  customer: string;
  totalPrice: string;
  date: string;
  status: string;
};

export interface ICustomersTable {
  id: number | string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  docType: string;
  docNumber: string;
  nationality: string;
  address: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICarsTable {
  id: number | string;
  brand: string;
  model: string;
  kms: number;
  year: number;
  color: string;
  price: number;
  transmission: string;
  airConditioning?: boolean;
  img?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface IReservationsTable {
  id: number | string;
  startDate: string;
  endDate: string;
  totalDays: number;
  pricePerDay: number;
  totalPrice: number;
  paymentMethod: string;
  statusId: string;
  car: ICarsTable;
  user: ICustomersTable;
  createdAt?: string;
  updatedAt?: string;
}

export type complex =
  | ITopCustomers
  | ILatestTransactions
  | ICustomersTable
  | IReservationsTable
  | ICarsTable;

export interface ITable {
  limit?: number;
  selectedCategory?: string;
  headData: string[];
  bodyData: (
    | ITopCustomers
    | ILatestTransactions
    | ICustomersTable
    | ICarsTable
    | IReservationsTable
  )[];
}