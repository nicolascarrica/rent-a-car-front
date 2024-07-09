
import { useState, FormEvent } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Card from '../../UI/card/Card';
import classes from './CreateCustomer.module.scss';
import Input from '../../UI/input/Input';
import Button from '../../UI/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { CustomerFormData } from '../../Service/Customers/Interface';
import { createCustomer } from '../../Service/Customers/customersService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateCustomer = () => {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    docType: '',
    docNumber: '',
    nationality: '',
    address: '',
    birthDate: '',
  });

  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await createCustomer(formData);

    if (result.success) {
      toast.success('User has been created successfully!', {
        position: 'top-right',
        autoClose: 3000,
    });

      setTimeout(() => navigate('/customers'), 3000);
    } else {
      toast.error('Error to create user: ' + result.error, {
        position: 'top-right',
        autoClose: 3000,
      })
      throw new Error('Failed to create user. Please check the provided data and try again.');
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div className={classes.create}>
      <ToastContainer />
      <Card>
        <div className={classes.account}>
          <h1>
            <Icon icon="fluent:edit-16-regular" width="24" />
            {(' Create Customer')}
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            id='phone'
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            id="docType"
            type="text"
            options={['DNI', 'ID', 'PASSPORT']}
            placeholder="Doc Type"
            value={formData.docType}
            onChange={handleChange}
          />
          <Input
            id="docNumber"
            type="text"
            placeholder="Doc Number"
            value={formData.docNumber}
            onChange={handleChange}
          />
          <Input
            id="nationality"
            type="text"
            placeholder="Nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
          <Input
            id="address"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            id="birthDate"
            type="date"
            placeholder="Birth Date"
            value={formData.birthDate}
            onChange={handleChange}
          />
          <div className={classes.btn__wrapper}>
            <Button type="submit">Create</Button>
            <Link to="/customers">
              <Button outline={true} type="button">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCustomer;