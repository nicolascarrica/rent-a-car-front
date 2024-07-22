
import { reservations } from "../../../constants/table";
import LoadingSpinner from "../../UI/loadingSpinner/LoadingSpinner";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { IReservationsTable } from "../../../interfaces/Itable";
import EditReservation from "../../Edit/EditReservation";
const url = 'http://localhost:3000/api/v1/reservations'


function ReservationEdit() {
  const params = useParams();
  const { reservationId } = params;


   const reservationInfo: IReservationsTable = reservations.filter(
     (item) => item.id.toString() === reservationId
   )[0];

   let reservationEdit;

   const { data, error, status } = useFetch<IReservationsTable>(
    `${url}/${reservationId}`,
   );
   

   if (status === "loading") {
      reservationEdit = <LoadingSpinner />;
   }

   if (error) {
      reservationEdit = <EditReservation reservation={reservationInfo} />;
   }

   if (status === "fetched" && data) {
      reservationEdit = <EditReservation reservation={data} />;
   }

   return (
     <section>
       <h2 className="title">Edit Reservation</h2>
       {reservationEdit}
     </section>
   );
  }


export default ReservationEdit;
