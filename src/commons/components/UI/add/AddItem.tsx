import React from "react";

import classes from "./AddItem.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

interface Props {
  to: string;
  outline?: boolean;
  children: React.ReactNode;
}

const AddItem: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(props.to);
  };
  return (
    <h2
      className={`${classes.btn} ${
        props.outline ? classes.outline : classes.button
      } `}
      onClick={handleClick}
    >
      <Icon icon="tabler:plus" className={classes.icon} />
      <span className={classes.text}>{props.children}</span>
    </h2>
  );
};

export default AddItem