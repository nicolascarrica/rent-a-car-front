import { Icon } from '@iconify/react';
import { ICustomersTable } from '../../interfaces/Itable';
import Card from '../UI/card/Card';
import classes from './Edit.module.scss';
import Button from '../UI/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../UI/input/Input';
import { FormEvent, useEffect, useState } from 'react';
import { updateCustomer } from '../Service/Customers/customersService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCustomer: React.FC<{ customer?: ICustomersTable }> = (props) => {
  const [formData, setFormData] = useState<Partial<ICustomersTable>>({
    name: props.customer?.name ?? '',
    lastName: props.customer?.lastName ?? '',
    phone: props.customer?.phone ?? '',
    email: props.customer?.email ?? '',
    nationality: props.customer?.nationality ?? '',
    address: props.customer?.address ?? '',
    docType: props.customer?.docType ?? '',
    docNumber: props.customer?.docNumber ?? '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (props.customer) {
      setFormData({
        name: props.customer.name ?? '',
        lastName: props.customer.lastName ?? '',
        phone: props.customer.phone ?? '',
        email: props.customer.email ?? '',
        nationality: props.customer.nationality ?? '',
        address: props.customer.address ?? '',
        docType: props.customer.docType ?? '',
        docNumber: props.customer.docNumber ?? '',
      });
    }
  }, [props.customer]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (props.customer?.id) {

      console.log('Form data before validation:', formData);
  
      const isFormDataValid = Object.values(formData).every(value => value !== undefined && value !== '' && !Number.isNaN(value));
      
      if (!isFormDataValid) {
        toast.error('Please fill out all fields correctly.', {
          position: 'top-right',
          autoClose: 3000,
        });
        console.error('Invalid form data:', formData); 
        return;
      }
  
      console.log('Form data after validation:', formData); 
  
      const result = await updateCustomer(props.customer.id.toString(), formData);
  
      if (result.success) {
        toast.success('User has been updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setTimeout(() => navigate('/customers'), 3000);
      } else {
        toast.error('Error updating user: ' + result.error, {
          position: 'top-right',
          autoClose: 3000,
        });
        console.error('Failed to update user:', result.error);
      }
    }
  };
  

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setFormData({ ...formData, [id]: value });
  };
  

  return (
    <div className={classes.edit__container}>
      <ToastContainer />
      <div className={classes.edit__left}>
        <Card>
          <div className={classes.account}>
            <div className={classes.account__info}>
              <p>Account Details</p>
              <div className={classes.account__info__userName}>
                <Icon icon="majesticons:user-line" width="24" />
                <div>
                  {props.customer?.name} {props.customer?.lastName}
                </div>
              </div>
              <div className={classes.account__info__userName}>
                <Icon icon="majesticons:article-line" width="24" />
                <div>
                  {props.customer?.docType} {props.customer?.docNumber}
                </div>
              </div>
            </div>
            <div className={classes.account__info}>
              <p>Contacts</p>
              <div className={classes.account__contact__phone}>
                <Icon icon="clarity:mobile-phone-solid" width="26" />
                <div>{props.customer?.phone}</div>
              </div>
              <div className={classes.account__contact__email}>
                <Icon icon="fontisto:email" width="24" />
                <div>{props.customer?.email}</div>
              </div>
              <div className={classes.account__contact__location}>
                <Icon icon="majesticons:home-line" width="28" />
                <div>{props.customer?.address}</div>
              </div>
              <div className={classes.account__contact__location}>
                <Icon icon="ep:map-location" width="28" />
                <div>{props.customer?.nationality}</div>
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
                id="name"
                type="text"
                placeholder={props.customer?.name ?? ''}
                // value={formData.name}
                onChange={handleChange}
              />
              <Input
                id="lastName"
                type="text"
                placeholder={props.customer?.lastName ?? ''}
                // value={formData.lastName}
                onChange={handleChange}
              />
              <Input
                id="phone"
                type="tel"
                minLength={7}
                maxLength={12}
                placeholder={props.customer?.phone ?? ''}
                // value={formData.phone}
                onChange={handleChange}
              />
              <Input
                id="email"
                type="email"
                placeholder={props.customer?.email ?? ''}
                // value={formData.email}
                onChange={handleChange}
              />
              <Input
                id="nationality"
                type="text"
                minLength={2}
                placeholder={props.customer?.nationality ?? ''}
                value={formData.nationality}
                onChange={handleChange}
              />
              <div className={classes.btn__wrapper}>
                <Button type="submit">Upload</Button>
                <Link to="/customers">
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

export default EditCustomer;