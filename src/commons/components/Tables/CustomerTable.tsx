import { useState } from "react";
import { ITable as Props, complex } from "../../interfaces/ITable";
import Badge from "../UI/badge/Badge";

const CustomerTable: React.FC<Props> = (props) => {

  const [showModal, setShowModal] = useState(false);
  function showModalHandler() {
    setShowModal((prev) => !prev);
  }

  function tableBody(item: complex, index: number){
    /* type guard (in typescript) */
    if("username" in item){
      //for top customers
      return (
        <tr key={index}>
          <td>{item.username}</td>
          <td>{item.reservations}</td>
        </tr>
      );
    } else if ("reservationId" in item) {
      //for latest reservations
      return (
        <tr key={index}>
          <td>{item.reservationId}</td>
          <td>{item.customer}</td>
          <td>{item.totalPrice}</td>
          <td>{item.date}</td>
          <td>
            <Badge content={item.status} />
          </td>
        </tr>
      )

  

  }
}

export default CustomerTable