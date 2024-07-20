
import useFetch from "../../../hooks/useFetch";
import CustomTable from "../../Tables/CustomTable";
import { IReservationsTable } from "../../../interfaces/Itable";
import { reservations, reservationsHeader } from "../../../constants/table";
import LoadingSpinner from "../../UI/loadingSpinner/LoadingSpinner";
import AddItem from "../../UI/add/AddItem";
const url = 'http://localhost:3000/api/v1/reservations'

function Reservations(): JSX.Element {
  const { data, error, status} = useFetch<IReservationsTable[]>(url);
  
  console.log(data)
  
  let reservationTable;

  if (status === "loading") {
    reservationTable = <LoadingSpinner />;
  } 

  if (error) {
    reservationTable = (
      <CustomTable limit={10} headData={reservationsHeader} bodyData={reservations} />
    );
  }

  if (status === "fetched" && data) {
    reservationTable = (
      <CustomTable limit={10} headData={reservationsHeader} bodyData={data} />
    );
  }

  return (
    <section>
      <h2>{("Reservations")}</h2>
      <div>
        <AddItem to="/add-reservation"> 
          Add Item
        </AddItem>
      {reservationTable}
      </div>
      
    </section>
  );
}

export default Reservations;


