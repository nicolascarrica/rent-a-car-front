import { Icon } from '@iconify/react';
import { ICustomersTable } from '../../../interfaces/Itable';
import Card from '../../UI/card/Card';
import classes from './EditCustomer.module.scss'
import Button from '../../UI/button/Button';
import { Link } from 'react-router-dom';
import Input from '../../UI/input/Input';
const EditCustomer: React.FC<{ customer?: ICustomersTable }> =  ( props ) => {

  return (
    <div className={classes.edit__container}>
      <div className={classes.edit__left}>
        <Card>
          <div className={classes.account}>
          
              {/* <img
                className={classes.avatar}
                src={customer?.avatar}
                alt='customer-avatar'
              /> */}
            
            <div className={classes.account__info}>
              <p>{'Account Details'}</p>
              <div className={classes.account__info__userName}>
                <Icon icon="majesticons:user-line" width="24" />
                <div>{props.customer?.name} {props.customer?.lastName}</div>
              </div>
              <div className={classes.account__info__userName}>
                <Icon icon="majesticons:article-line" width="24" />
                <div>{props.customer?.docType} {props.customer?.docNumber}</div>
              </div>

            </div>

            <div className={classes.account__info}>
              <p>{("contacts")}</p>
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
                {("Edit")}
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                id="Name"
                type="text"
                placeholder={props.customer?.name} 
              />
              <Input
                id="Last Name"
                type="text"
                placeholder={props.customer?.lastName} 
              />
              <Input
                id="Phone Number"
                type="tel"
                minLength={7}
                maxLength={12}
                placeholder={props.customer?.phone}
              />
              <Input
                id="email"
                type="email"
                placeholder={props.customer?.email}
              />
              <Input
                id="Nationality"
                type="text"
                minLength={10}
                placeholder={props.customer?.nationality}
              />
              <div className={classes.btn__wrapper}>
                <Link to="/customers">
                  <Button type="submit">Upload</Button>
                </Link>
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