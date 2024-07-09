import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ITable as Props, complex } from "../../interfaces/Itable";
import Card from "../UI/card/Card";
import Badge from "../UI/badge/Badge";
import Modal from "../UI/modal/Modal";
import { Icon } from "@iconify/react";
import classes from "./CustomerTable.module.scss";
import { deleteItemFromDatabase } from "../Service/Customers/customersService";

const CustomerTable: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | string>();

  const showModalHandler = (id: number|string) => {
    setItemToDelete(id);
    setShowModal((prev) => !prev);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete !== undefined) {
      const result = await deleteItemFromDatabase(itemToDelete);
      if (result) {
        setDataShow((prevData) =>
          prevData.filter((item) => {
            if ('id' in item) {
              return item.id !== itemToDelete;
            } else if ('orderId' in item) {
              return item.orderId !== itemToDelete;
            } else if ('ID' in item) {
              return item.ID !== itemToDelete;
            }
            return true;
          })
        );
      }
    }
    setShowModal(false);
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
  };


  function tableBody(item: complex, index: number) {
    //for implementing top customers
    if ('username' in item){
      return (
        <tr key={index}>
          <td>{item.username}</td>
          <td>{item.order}</td>
          <td>{item.price}</td>
        </tr>
      );
    } else if ('orderId' in item) {
      //for implementing latest transactions
      return (
        <tr key={index}>
          <td>{item.orderId}</td>
          <td>{item.customer}</td>
          <td>{item.totalPrice}</td>
          <td>{item.date}</td>
          <td>
            <Badge content={item.status} />
          </td>
        </tr>
      );
    } else if ('email' in item) {
       //for implementing customers table
       return (
        <tr key={index}>
          <td>{item.id}</td>
          <td className={classes.userName}>
            {/* <img
              className={classes.avatar}
              src={item.avatar}
              alt="user avatar"
            /> */}
            {item.name + " " + item.lastName}
          </td>
          <td className="ltr">{item.email}</td>
          <td className="ltr">{item.phone}</td>
          <td>{item.docType}</td>
          <td>{item.docNumber}</td>
          <td>{item.nationality}</td>
          <td className={classes.actions}>
            <Icon icon="charm:menu-kebab" />
            <div className={classes.actions__box}>
              <div
                className={classes.actions__delete}
                onClick={() => showModalHandler(item.id)}
              >
                <Icon icon="fluent:delete-24-regular" width="24" />
              </div>
              <div className={classes.actions__edit}>
                <Link to={`/customers/${item.id}`}>
                  <Icon icon="fluent:edit-16-regular" width="24" />
                </Link>
              </div>
            </div>
          </td>
        </tr>
      );
    } else if ("category" in item) {
      //for implementing products table
      return (
        <tr key={index}>
          <td>{item.ID}</td>
          <td className={classes.product_name}>
            <img
              className={classes.product_img}
              src={item.pic}
              alt="user avatar"
            />
            {item.product}
          </td>
          <td>{item.inventory}</td>
          <td>{item.price}</td>
          <td>{item.category}</td>
          <td className={classes.actions}>
            <Icon icon="charm:menu-kebab" />
            <div className={classes.actions__box}>
              <div
                className={classes.actions__delete}
                onClick={() => showModalHandler(item.ID)}
              >
                <Icon icon="fluent:delete-24-regular" width="24" />
              </div>
              <div className={classes.actions__edit}>
                <Link to={`/products/${item.ID}`}>
                  <Icon icon="fluent:edit-16-regular" width="24" />
                </Link>
              </div>
            </div>
          </td>
        </tr>
      );
    }
  }

  const initDataShow = () => {
    return props.limit && props.bodyData 
      ? props.bodyData.slice(0, Number(props.limit))
      : props.bodyData;
  };

  const [dataShow, setDataShow] = useState(initDataShow);
  // const [selectedCategory, setSelectedCategory] = useState(
  //   props.selectedCategory
  // );

  // if (props.selectedCategory) {
  //   if (selectedCategory !== props.selectedCategory)
  //     setDataShow(props.bodyData);
  // }
  // setSelectedCategory(props.selectedCategory);

  let pages = 1;
  let range: number[] = [];

  if (props.limit !== undefined) {
    const page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page: number) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);
    setDataShow(props.bodyData.slice(start, end));
    setCurrPage(page);
  };
  

  return (
    <>
      {/* modal for delete customer and product case*/}
      {showModal ? (
        <Modal
          title={("Delete Item")}
          message={("Are you sure you want to delete this item?")}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      ) : null}

      <div className={classes.container}>
        <Card>
          <div className={classes.wrapper}>
            <div className={classes.table__wrapper}>
              <table
                className={props.limit ? classes.largeTable : classes.table}
              >
                {props.headData ? (
                  <thead>
                    <tr>
                      {props.headData.map((item, index) => (
                        <th key={index}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {dataShow.map((item, index) => tableBody(item, index))}
                </tbody>
              </table>
            </div>

            {pages > 1 ? (
              <div className={classes.table__pagination}>
                {range.map((item, index) => (
                  <div
                    key={index}
                    className={`${classes.table__pagination_item} ${
                      currPage === index ? classes.active : ""
                    }`}
                    onClick={() => selectPage(index)}
                  >
                    {item + 1}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </>
  );
};

export default CustomerTable

    
