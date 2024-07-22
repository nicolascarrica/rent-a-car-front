import React from "react";
import Summary from "../../Summary/Summary";
import SaleChart from "../../Chart/Chart";


function Dashboard() {
  return (
    <section>
      <h2 className="title">Dashboard</h2>
      <Summary />
      <SaleChart />
    </section>
  );
}

export default Dashboard;