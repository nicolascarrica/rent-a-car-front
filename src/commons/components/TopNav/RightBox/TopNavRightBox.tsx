import React from "react";

import classes from "./TopNavRightBox.module.scss";
import ThemeBox from "./ThemeBox/ThemeBox";
import Profile from "./Profile/Profile";

function TopNavRightBox() {
  return (
    <div className={classes.topNavBox_right}>
      <div className={classes.wrapper}>
        <ThemeBox />
      </div>
      <Profile />
    </div>
  );
}

export default TopNavRightBox;