import { useContext } from "react"
import SidebarContext from "../store/sidebarContext"
import { useWindowSize } from "usehooks-ts";
import classes from "./TopNav.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import SearchBox from "./SearchBox/SearchBox";
import TopNavRightBox from "./RightBox/TopNavRightBox";

function TopNav(){
  const sideOpenCtx = useContext(SidebarContext);
  const { width } = useWindowSize();

  function openSidebarHandler() {
    sideOpenCtx.toggleSidebar();
    if (width <= 768) document.body.classList.toggle("sidebar__open");
  }

  return (
    <div className={classes.topNav}>
      <div className={classes.topNav_left}>
        <div
          className={classes.topNav_left_menu_icon}
          onClick={openSidebarHandler}
        >
          <Icon icon="ci:menu-alt-03" width="24" />
        </div>
        <div className={classes.topNav_left_menu} onClick={openSidebarHandler}>
          <div className="topNav_left_menu_open">
            <Icon icon="ci:menu-alt-03" width="24" />
          </div>

          <div className="topNav_left_menu_close">
            <Icon icon="eva:close-fill" width="24" />
          </div>
        </div>
        <div className={classes.search_desktop_wrapper}>
          <SearchBox />
        </div>
      </div>
      <TopNavRightBox />
      <br />
      <div className={classes.search_tablet_wrapper}>
        <SearchBox />
      </div>
    </div>
  );
}

export default TopNav