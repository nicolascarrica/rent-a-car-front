import React from "react";
import classes from "./Summary.module.scss";
import { IsummData } from "../Service/Customers/Interface";
import SummaryBox from "./SummaryBox";


const summaryData: IsummData[] = [
  {
    icon: "material-symbols:person-celebrate",
    text: "This Month Customers",
    amount: "35",
    currency: "",
  },
  {
    icon: "icon-park-outline:transaction-order",
    text: "this Month Reservations",
    amount: "250",
    currency: "",
  },
  {
    icon: "material-symbols:directions-car-outline-sharp",
    text: "This Month Cars",
    amount: "10",
    currency: "",
  },
];

function Summary() {
  return (
    <section className={classes.summary}>
      <p className="subTitle">Summary</p>
      <div className={classes.summary__box}>
        {summaryData.map((item) => (
          <SummaryBox key={item.text} item={item} />
        ))}
      </div>
    </section>
  );
}

export default Summary;