import React, { FormEvent, useEffect, useState } from 'react';
import { ICarsTable } from '../../interfaces/Itable';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { updateCar } from '../Service/Customers/carsService';
import classes from './Edit.module.scss';
import Card from '../UI/card/Card';
import { Icon } from '@iconify/react/dist/iconify.js';
import Input from '../UI/input/Input';
import Button from '../UI/button/Button';
import Select from '../UI/input/Select';

const EditCar: React.FC<{ car?: ICarsTable }> = (props) => {
  const [formData, setFormData] = useState<Partial<ICarsTable>>({
    brand: props.car?.brand ?? '',
    model: props.car?.model ?? '',
    kms: props.car?.kms ?? 0,
    year: props.car?.year ?? 0,
    color: props.car?.color ?? '',
    price: props.car?.price ?? 0,
    transmission: props.car?.transmission ?? '',
    airConditioning: props.car?.airConditioning ?? false,
    img: props.car?.img ?? '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (props.car) {
      setFormData({
        brand: props.car.brand ?? '',
        model: props.car.model ?? '',
        kms: props.car.kms ?? 0,
        year: props.car.year ?? 0,
        color: props.car.color ?? '',
        price: props.car.price ?? 0,
        transmission: props.car.transmission ?? '',
        airConditioning: props.car.airConditioning ?? false,
        img: props.car.img ?? '',
      });
    }
  }, [props.car]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (props.car?.id) {

      const updatedFormData = {
        ...formData,
        price: Number(formData.price),
        kms: Number(formData.kms),
        year: Number(formData.year),
      };

      const isFormDataValid =
        updatedFormData.brand?.trim() !== '' &&
        updatedFormData.model?.trim() !== '' &&
        !Number.isNaN(updatedFormData.kms) &&
        updatedFormData.kms >= 0 &&
        !Number.isNaN(updatedFormData.year) &&
        updatedFormData.year >= 1886 &&
        updatedFormData.year <= new Date().getFullYear() &&
        updatedFormData.color?.trim() !== '' &&
        !Number.isNaN(updatedFormData.price) &&
        updatedFormData.price >= 0 &&
        updatedFormData.transmission?.trim() !== '';

      if (!isFormDataValid) {
        toast.error('Please fill out all fields correctly.', {
          position: 'top-right',
          autoClose: 3000,
        });
        console.error('Invalid form data:', updatedFormData);
        return;
      }

      const result = await updateCar(props.car.id.toString(), updatedFormData);

      if (result.success) {
        toast.success('Car has been updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => navigate('/cars'), 3000);
      } else {
        toast.error('Error to update car: ' + result.error, {
          position: 'top-right',
          autoClose: 3000,
        });
        throw new Error('Failed to update car. Please check the provided data and try again.');
      }
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: id === 'kms' || id === 'year' || id === 'price' ? Number(value) : value,
    }));
  };

  return (
    <div className={classes.edit__container}>
      <ToastContainer />
      <div className={classes.edit__left}>
        <Card>
          <div className={classes.account}>
            <div className={classes.account__info}>
              <p>Car Details</p>
              <div className={classes.account__info__userName}>
                <Icon icon="majesticons:car-line" width="24" />
                <div>
                  {props.car?.brand} {props.car?.model}
                </div>
              </div>
              <div className={classes.account__info__userName}>
                <Icon icon="material-symbols:scale-outline" width="24" />
                <div>
                  {props.car?.year}
                </div>
              </div>
              <div className={classes.account__info__userName}>
                <Icon icon="hugeicons:road" width="24" />
                <div>
                  {props.car?.kms} kms
                </div>
              </div>
              <div className={classes.account__info__userName}>
                <Icon icon="material-symbols:invert-colors" width="24" />
                <div>
                  {props.car?.color}
                </div>
              </div>
              <div className={classes.account__info__userName}>
                <Icon icon="solar:dollar-linear" width="24" />
                <div>
                  {props.car?.price}
                </div>
              </div>
              <div className={classes.account__info__userName}>
                <Icon icon="material-symbols:auto-transmission-sharp" width="24" />
                <div>
                  {props.car?.transmission}
                </div>
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
                id="brand"
                type="text"
                placeholder={props.car?.brand ?? ''}
                value={formData.brand}
                onChange={handleChange}
              />
              <Input
                id="model"
                type="text"
                placeholder={props.car?.model ?? ''}
                value={formData.model}
                onChange={handleChange}
              />
              <Input
                id="year"
                type="number"
                maxLength={4}
                placeholder={String(props.car?.year) || ''}
                value={formData.year}
                onChange={handleChange}
              />
              <Input
                id="kms"
                type="number"
                placeholder={String(props.car?.kms) || ''}
                value={formData.kms}
                onChange={handleChange}
              />
              <Input
                id="color"
                type="text"
                placeholder={props.car?.color ?? ''}
                value={formData.color}
                onChange={handleChange}
              />
              <Input
                id="price"
                type="number"
                placeholder={String(props.car?.price) || ''}
                value={formData.price}
                onChange={handleChange}
              />
              <Select
                id="transmission"
                value={formData.transmission}
                onChange={handleChange}
                options={[
                  { value: 'Automatic', label: 'Automatic' },
                  { value: 'Manual', label: 'Manual' },
                ]}
              />
              <div className={classes.btn__wrapper}>
                <Button type="submit">Upload</Button>
                <Link to="/cars">
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

export default EditCar;
