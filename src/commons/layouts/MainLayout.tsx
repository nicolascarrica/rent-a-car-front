import { useContext, useEffect } from "react";
import SidebarContext from "../components/store/sidebarContext";
import classes from "./MainLayout.module.scss";
import Sidebar from "../components/Sidebar/Sidebar";
import TopNav from "../components/TopNav/TopNav";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const sidebarCtx = useContext(SidebarContext);

  useEffect(() => {
    if (document.body.classList.contains("sidebar__open"))
      document.body.classList.remove("sidebar__open");
  }, []);

  return (
    <div className={classes.container}>
      <Sidebar />
      <div className={classes.main}>
        <div
          className={`${classes.main__content} ${
            !sidebarCtx.isOpen ? classes.close_sidebar : ""
          } main_wrapper`}
        >
          <TopNav />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;