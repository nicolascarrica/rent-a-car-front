
import { useState, FormEvent } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Card from '../../UI/card/Card';
import classes from './CreateCustomer.module.scss';
import Input from '../../UI/input/Input';
import Button from '../../UI/button/Button';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  docType: string;
  docNumber: string;
  nationality: string;
  address: string;
  birthDate: string;
}

const CreateCustomer = () => {
  const [formData, setFormData] = useState<FormData>({
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
  
    try {
      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          lastName: formData.lastName,
          docType: formData.docType,
          docNumber: formData.docNumber,
          nationality: formData.nationality,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          birthDate: formData.birthDate,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User created:', data);
        navigate('/customers');
      } else {
        const errorData = await response.json();
        console.error('Error to create user:', errorData);
      }
    } catch (error) {
      console.error('Error to create user', error);
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