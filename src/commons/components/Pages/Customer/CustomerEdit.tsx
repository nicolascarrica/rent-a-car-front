import { useParams } from "react-router-dom";
import { ICustomersTable } from "../../../interfaces/Itable";
import { customers } from "../../../constants/table";
import LoadingSpinner from "../../UI/loadingSpinner/LoadingSpinner";
import useFetch from "../../../hooks/useFetch";
import EditCustomer from "../../Edit/EditCustomer/EditCustomer";
const url = 'http://localhost:3000/api/v1/users'


function CustomerEdit() {
  const params = useParams();
  const { userId } = params;


   const customerInfo: ICustomersTable = customers.filter(
     (item) => item.id.toString() === userId
   )[0];

   let customerEdit;

   const { data, error, status } = useFetch<ICustomersTable>(
    `${url}/${userId}`,
   );
   

   if (status === "loading") {
     customerEdit = <LoadingSpinner />;
   }

   if (error) {
     customerEdit = <EditCustomer customer={customerInfo} />;
   }

   if (status === "fetched" && data) {
     customerEdit = <EditCustomer customer={data} />;
   }

   return (
     <section>
       <h2 className="title">Edit Customer</h2>
       {customerEdit}
     </section>
   );
  }


export default CustomerEdit;
