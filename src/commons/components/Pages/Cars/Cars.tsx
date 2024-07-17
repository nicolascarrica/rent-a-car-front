import { cars, carsHeader } from "../../../constants/table";
import useFetch from "../../../hooks/useFetch";
import { ICarsTable } from "../../../interfaces/Itable"
import CustomTable from "../../Tables/CustomTable";
import AddItem from "../../UI/add/AddItem";
import LoadingSpinner from "../../UI/loadingSpinner/LoadingSpinner";

const url = 'http://localhost:3000/api/v1/cars'

function Cars(): JSX.Element {
  const { data, error, status} = useFetch<ICarsTable[]>(url);
  
  let carTable;

  if (status === "loading") {
    carTable = <LoadingSpinner />;
  } 

  if (error) {
    carTable = (
      <CustomTable limit={10} headData={carsHeader} bodyData={cars} />
    );
  }

  if (status === "fetched" && data) {
    carTable = (
      <CustomTable limit={10} headData={carsHeader} bodyData={data} />
    );
  }

  return (
    <section>
      <h2>Cars</h2>
      <div>
        <AddItem to="/add-cars"> 
          Add Item
        </AddItem>
      {carTable}
      </div>
      
    </section>
  );
}

export default Cars;