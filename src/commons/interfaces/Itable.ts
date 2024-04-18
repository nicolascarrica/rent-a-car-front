export interface ITopCustomers {
  username: string;
  reservations: number;
}

export type TLatestReservations = {
  reservationId: string;
  customer: string;
  totalPrice: string;
  date: string;
  status: string;
};

export interface ICustomersTable {
  ID: number | string;
  userName: string;
  docNumber: string;
  email: string;
  phoneNumber: string;
  totalOrders: number;
  totalSpend: string;
  location: string;
}

export interface ICarsTable {
  ID: number | string;
  pic: string;
  product: string;
  inventory: number;
  price: string;
  category: string;
}

export type complex =
  | ITopCustomers
  | TLatestReservations
  | ICustomersTable
  | ICarsTable;

export interface ITable {
  limit?: number;
  selectedCategory?: string;
  headData: string[];
  bodyData: (
    | ITopCustomers
    | TLatestReservations
    | ICustomersTable
    | ICarsTable
  )[];
}