import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import SidebarContext from "../store/sidebarContext";
import LoginContext from "../store/loginContext";
import classes from "./Sidebar.module.scss";
import images from "../../constants/images";
import sidebarNav from "../Config/sidebarNav";
import { Icon } from "@iconify/react/dist/iconify.js";

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowSize();
  const location = useLocation();
  const sidebarCtx = useContext(SidebarContext);
  const loginCtx = useContext(LoginContext);

  function openSidebarHandler() {
    if (width <=7680) document.body.classList.toggle("sidebar__open");
  }

  function logoutHandler() {
    openSidebarHandler();
    loginCtx.toggleLogin();
  }

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNav.findIndex((item) => item.section === curPath);

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div
      className={`${classes.sidebar} ${
        !sidebarCtx.isOpen && classes.sidebar_close
      }`}
    >
      <div className={classes.sidebar__logo}>
        <img src={images.logo} alt="logo" />
        <h1>Rent-a-car</h1>
      </div>
      <div className={classes.sidebar__menu}>
        {sidebarNav.map((nav, index) => (
          <Link
            to={nav.link}
            key={index}
            className={`${classes.sidebar__menu__item} ${
              activeIndex === index && classes.active
            }`}
            onClick={openSidebarHandler}
          >
            <div className={classes.sidebar__menu__item__icon}>
              <Icon icon={nav.icon} />
            </div>
            <div className={classes.sidebar__menu__item__txt}>
              {(nav.section)}
            </div>
          </Link>
        ))}
      </div>
      <div className={[classes.sidebar__menu, classes.logout].join("")}>
        <Link
          to="/login"
          className={classes.sidebar__menu__item}
          onClick={logoutHandler}
        >
          <div className={classes.sidebar__menu__item__icon}>
            <Icon icon="tabler:logout" />
          </div>
          <div className={classes.sidebar__menu__item__txt}>{("logout")}</div>
        </Link>
      </div>  
    </div>

  )
}



export default Sidebar;