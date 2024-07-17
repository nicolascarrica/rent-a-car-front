import { useParams } from "react-router-dom";
import { ICarsTable} from "../../../interfaces/Itable";
import { cars } from "../../../constants/table";
import LoadingSpinner from "../../UI/loadingSpinner/LoadingSpinner";
import useFetch from "../../../hooks/useFetch";
import EditCar from "../../Edit/EditCar";
const url = 'http://localhost:3000/api/v1/cars'


function CarsEdit() {
  const params = useParams();
  const { carId } = params;


   const carInfo: ICarsTable = cars.filter(
     (item) => item.id.toString() === carId
   )[0];

   let carEdit;

   const { data, error, status } = useFetch<ICarsTable>(
    `${url}/${carId}`,
   );
   

   if (status === "loading") {
     carEdit = <LoadingSpinner />;
   }

   if (error) {
     carEdit = <EditCar car={carInfo} />;
   }

   if (status === "fetched" && data) {
     carEdit = <EditCar car={data} />;
   }

   return (
     <section>
       <h2 className="title">Edit Car</h2>
       {carEdit}
     </section>
   );
  }


export default CarsEdit;
