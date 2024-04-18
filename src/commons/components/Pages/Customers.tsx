import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";

const URL_API = import.meta.env.VITE_URL_API_BASE;
const BASE_URL = '/users';

function Customers() {
  const { data, error, status } = useFetch(`${URL_API}${BASE_URL}`);
  console.log(`${URL_API}${BASE_URL}`)

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error.message);
    }
  }, [error]);

  let customerTable;

  if (status === 'loading') {
    customerTable = <p>Loading lpm...</p>;
  } else if (error) {
    customerTable = <p>Error: {error.message}</p>;
  } else if (data) {
    // Renderiza tus datos aquí
    customerTable = <p>'hola'</p>;
  }

  return (
    <section>
      <h2 className="title">Customers</h2>
      {customerTable}
    </section>
  );
}

export default Customers;