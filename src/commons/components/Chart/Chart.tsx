import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import classes from "./Chart.module.scss";
import Card from "../UI/card/Card";
import data from "../../constants/data";

const SaleChart = () => {
  const labels = data.revenueByMonths.labels.map((month) => (month));
  const [userData] = useState({
    labels,
    datasets: [
      {
        label: "Summary Of Reservations",
        data: data.revenueByMonths.data,
        borderColor: "#ee384e",
        backgroundColor: "#3c4b6d",
      },
    ],
  });

  const [orderData] = useState({
    labels,
    datasets: [
      {
        label: "Summary Of Cars",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const [revenueData] = useState({
    labels,
    datasets: [
      {
        label: "Summary Of Revenue",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  return (
    <section className={classes.chart}>
      <p className="subTitle">Quick Analysis</p>
      <div className={classes.charts__container}>
        <div className={classes.charts__wrapper}>
          <Card>
            <div className={classes.chart__wrapper}>
              <BarChart
                chartData={orderData}
                chartTitle={`${("summaryOfCars")}`}
              />
            </div>
          </Card>
          <Card>
            <div className={classes.chart__wrapper}>
              <BarChart
                chartData={revenueData}
                chartTitle={`${("summaryOfUsers")}`}
              />
            </div>
          </Card>
        </div>
        <Card>
          <div className={classes.chart__wrapper}>
            <LineChart chartData={userData} />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SaleChart;