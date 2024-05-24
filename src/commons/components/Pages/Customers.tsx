import React from "react";
import useFetch from "../../hooks/useFetch";
import CustomerTable from "../Tables/CustomerTable";
import { ICustomersTable } from "../../interfaces/Itable";
import { customers, customersHeader } from "../../constants/table";
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner";
const url = 'http://localhost:3000/api/v1/users'

function Customers(): JSX.Element {
  const { data, error, status} = useFetch<ICustomersTable[]>(url);
  
  let customerTable;

  if (status === "loading") {
    customerTable = <LoadingSpinner />;
  } 

  if (error) {
    customerTable = (
      <CustomerTable limit={10} headData={customersHeader} bodyData={customers} />
    );
  }

  if (status === "fetched" && data) {
    console.log("Data:", data);
    customerTable = (
      <CustomerTable limit={10} headData={customersHeader} bodyData={data} />
    );
  }

  return (
    <section>
      <h2 className="title">{("Customers")}</h2>
      {customerTable}
    </section>
  );
}

export default Customers;
