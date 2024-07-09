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

export interface IProductsTable {
  ID: number | string;
  pic: string;
  product: string;
  inventory: number;
  price: string;
  category: string;
}

export type complex =
  | ITopCustomers
  | ILatestTransactions
  | ICustomersTable
  | IProductsTable;

export interface ITable {
  limit?: number;
  selectedCategory?: string;
  headData: string[];
  bodyData: (
    | ITopCustomers
    | ILatestTransactions
    | ICustomersTable
    | IProductsTable
  )[];
}