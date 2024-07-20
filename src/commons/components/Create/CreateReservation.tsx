import { useState, useEffect, FormEvent } from 'react';
import { ReservationFormData } from '../Service/Customers/Interface';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Create.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import Card from '../UI/card/Card';
import { Icon } from '@iconify/react/dist/iconify.js';
import Input from '../UI/input/Input';
import Select from '../UI/input/Select';  // Importa el componente Select
import Button from '../UI/button/Button';
import { createReservation } from '../Service/Customers/reservationService';

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

const CreateReservation = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<ReservationFormData>({
    startDate: new Date,
    endDate: new Date,
    paymentMethod: '',
    statusId: '',
    carId: 0,
    userId: 0,
  });

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

  const handleChange = (event: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.currentTarget as HTMLInputElement | HTMLSelectElement;
    const newFormData = { ...formData, [id]: value };
  
    setFormData(newFormData);
  };
  

  const carOptions = cars.map(car => ({
    value: car.id.toString(),
    label: `${car.brand} ${car.model}`
  }));

  const userOptions = users.map(user => ({
    value: user.id.toString(),
    label: `${user.name} ${user.lastName}`
  }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await createReservation(formData);

    if (result.success) {
      toast.success('Reservation has been created successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      setTimeout(() => navigate('/reservations'), 3000);
    } else {
      toast.error('Error to create reservation: ' + result.error, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className={classes.create}>
      <ToastContainer />
      <Card>
        <div className={classes.account}>
          <h1>
            <Icon icon="fluent:edit-16-regular" width="24" />
            Create Reservation
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
          />
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
          />
          <Select
            id="carId"
            options={carOptions}
            value={formData.carId.toString()}
            onChange={handleChange}
          />
          <Select
            id="userId"
            options={userOptions}
            value={formData.userId.toString()}
            onChange={handleChange}
          />
          <Select
            id="paymentMethod"
            options={[
              { value: 'Cash', label: 'Cash' },
              { value: 'Credit Card', label: 'Credit Card' },
              { value: 'Debit Card', label: 'Debit Card' },
            ]}
            value={formData.paymentMethod}
            onChange={handleChange}
          />
          <Select
            id="statusId"
            options={[
              { value: 'Pending', label: 'Pending' },
              { value: 'Confirmed', label: 'Confirmed' },
              { value: 'Cancelled', label: 'Cancelled' },
            ]}
            value={formData.statusId}
            onChange={handleChange}
          />
          <div className={classes.btn__wrapper}>
            <Button type="submit">Create</Button>
            <Link to="/reservations">
              <Button outline={true} type="button">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default CreateReservation;

