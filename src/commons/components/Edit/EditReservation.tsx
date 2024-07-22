import { FormEvent, useEffect, useState } from "react";
import { IReservationsTable } from "../../interfaces/Itable";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Card from "../UI/card/Card";
import classes from "./Edit.module.scss";
import { Icon } from "@iconify/react";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Select from "../UI/input/Select";
import { updateReservation } from "../Service/Customers/reservationService";
import { ReservationEditData } from "../Service/Customers/Interface";

interface Car {
  id: number;
  brand: string;
  model: string;
}

interface User {
  id: number;
  name: string;
  lastName: string;
}

const EditReservation: React.FC<{ reservation?: IReservationsTable }> = (props) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<Partial<ReservationEditData>>({
    startDate: props.reservation?.startDate ?? "",
    endDate: props.reservation?.endDate ?? "",
    paymentMethod: props.reservation?.paymentMethod ?? "",
    statusId: props.reservation?.statusId ?? "",
    userId: Number(props.reservation?.user?.id) || undefined,
    carId: Number(props.reservation?.car?.id) || undefined,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (props.reservation) {
      setFormData({
        startDate: props.reservation?.startDate || "",
        endDate: props.reservation?.endDate || "",
        paymentMethod: props.reservation?.paymentMethod || "",
        statusId: props.reservation?.statusId || "",
        userId: Number(props.reservation?.user?.id) || undefined,
        carId: Number(props.reservation?.car?.id) || undefined,
      });
    }
  }, [props.reservation]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (props.reservation?.id) {
      const updatedFields: Partial<ReservationEditData> = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        paymentMethod: formData.paymentMethod,
        statusId: formData.statusId,
        userId: formData.userId,
        carId: formData.carId,
      };

      console.log("Updated fields to send:", updatedFields);

      const result = await updateReservation(props.reservation.id.toString(), updatedFields);

      if (result.success) {
        toast.success("Reservation has been updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/reservations"), 3000);
      } else {
        toast.error("Error updating reservation: " + result.error.message, {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Error updating reservation:", result.error);
      }
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    setFormData({ ...formData, [id]: value });
  };

  const carOptions = cars.map(car => ({
    value: car.id.toString(),
    label: `${car.brand} ${car.model}`
  }));

  const userOptions = users.map(user => ({
    value: user.id.toString(),
    label: `${user.name} ${user.lastName}`
  }));

  return (
    <div className={classes.edit__container}>
      <ToastContainer />
      <div className={classes.edit__left}>
        <Card>
          <div className={classes.account}>
            <div className={classes.account__info}>
              <p>Reservation Details</p>
              <div className={classes.account__info__userName}>
                <Icon icon="mdi:calendar-start" width="24" />
                <div>
                  {props.reservation?.startDate}
                </div>
              </div>
              <div className={classes.account__info__userName}>
                <Icon icon="streamline:interface-calendar-check-approve-calendar-check-date-day-month-success" width="24" />
                <div>
                  {props.reservation?.endDate}
                </div>
              </div>
              <div className={classes.account__info__userName}>
                <Icon icon="streamline:interface-calendar-check-approve-calendar-check-date-day-month-success" width="24" />
                <div>
                  {props.reservation?.totalDays} days
                </div>
              </div>
              <div className={classes.account__contact__phone}>
                <Icon icon="tabler:calendar-dollar" width="26" />
                <div>{props.reservation?.pricePerDay}</div>
              </div>
              <div className={classes.account__contact__email}>
                <Icon icon="material-symbols:price-change-outline" width="24" />
                <div>{props.reservation?.totalPrice}</div>
              </div>
              <div className={classes.account__contact__location}>
                <Icon icon="streamline:money-atm-card-2-deposit-money-payment-finance-atm-withdraw" width="28" />
                <div>{props.reservation?.paymentMethod}</div>
              </div>
              <div className={classes.account__contact__location}>
                <Icon icon="fluent:status-12-regular" width="28" />
                <div>{props.reservation?.statusId}</div>
              </div>
              <div className={classes.account__contact__location}>
                <Icon icon="material-symbols:account-circle-full" width="28" />
                <div>{props.reservation?.user?.name} {props.reservation?.user?.lastName}</div>
              </div>
              <div className={classes.account__contact__location}>
                <Icon icon="material-symbols:directions-car-outline-sharp" width="28" />
                <div>{props.reservation?.car?.brand} {props.reservation?.car?.model}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className={classes.edit__right}>
        <Card>
          <div className={classes.account}>
            <h1 className={classes.subTitle}>
              <Icon icon="fluent:edit-16-regular" width="24" />
              Edit
            </h1>
            <form onSubmit={handleSubmit}>
              <Input
                id="startDate"
                type="date"
                placeholder={props.reservation?.startDate ?? ''}
                onChange={handleChange}
              />
              <Input
                id="endDate"
                type="date"
                placeholder={props.reservation?.endDate ?? ''}
                onChange={handleChange}
              />
              <Select
                id="car"
                options={carOptions}
                value={formData.carId?.toString()}
                onChange={handleChange}
              />
              <Select
                id="user"
                options={userOptions}
                value={formData.userId?.toString()}
                onChange={handleChange}
              />
              <Select
                id="paymentMethod"
                options={[
                  { value: 'Cash', label: 'Cash' },
                  { value: 'Credit Card', label: 'Credit Card' },
                  { value: 'Debit Card', label: 'Debit Card' },
                ]}
                onChange={handleChange}
              />
              <Select
                id="statusId"
                options={[
                  { value: 'Pending', label: 'Pending' },
                  { value: 'Confirmed', label: 'Confirmed' },
                  { value: 'Cancelled', label: 'Cancelled' },
                ]}
                onChange={handleChange}
              />
              <div className={classes.btn__wrapper}>
                <Button type="submit">Upload</Button>
                <Link to="/reservations">
                  <Button outline={true}>Cancel</Button>
                </Link>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditReservation;
