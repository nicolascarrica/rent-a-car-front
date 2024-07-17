
import { useState, FormEvent } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Card from '../UI/card/Card';
import classes from './Create.module.scss';
import Input from '../UI/input/Input';
import Button from '../UI/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { CarFormData } from '../Service/Customers/Interface';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCar } from '../Service/Customers/carsService';
import Select from '../UI/input/Select';


const CreateCars = () => {
  const [formData, setFormData] = useState<CarFormData>({
    brand: "",
    model: "",
    kms: 0, 
    year: 0,
    color: "",
    price: 0,
    transmission: "Auto",
    airConditioning: true,
  });

  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        data.append(key, formData[key as keyof CarFormData] as string);
      }
    }
    if (file) {
      data.append('img', file);
    }

    try {
      const result = await createCar(formData);

      if (result.success) {
        toast.success('Car has been created successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => navigate('/cars'), 3000);
      } else {
        toast.error('Error to create car: ' + result.error, {
          position: 'top-right',
          autoClose: 3000,
        })
        console.error('Error creating car:', result.error);
        throw new Error('Failed to create car. Please check the provided data and try again.');
      }
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    if (id in formData) {
      setFormData({
        ...formData,
        [id as keyof CarFormData]: value,
      });
    }
  };

  const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setFile(e.currentTarget.files[0]);
    }
  };

  return (
    <div className={classes.create}>
      <ToastContainer />
      <Card>
        <div className={classes.account}>
          <h1>
            <Icon icon="fluent:edit-16-regular" width="24" />
            {(' Create Car')}
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            id="brand"
            type="text"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
          />
          <Input
            id="model"
            type="text"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
          />
          <Input
            id="kms"
            type="number"
            placeholder="Kms"
            value={formData.kms}
            onChange={handleChange}
          />
          <Input
            id='year'
            type="number"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
          />
          <Input
            id="color"
            type="text"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
          />
          <Input
            id="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          <Input
            id="transmission"
            type="text"
            placeholder="Transmission"
            value={formData.transmission}
            onChange={handleChange}
          />
          <Select
            id="airConditioning"
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
            value={formData.airConditioning ? 'true' : 'false'}
            onChange={handleChange}
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <div className={classes.btn__wrapper}>
            <Button type="submit">Create</Button>
            <Link to="/cars">
              <Button outline={true} type="button">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCars;