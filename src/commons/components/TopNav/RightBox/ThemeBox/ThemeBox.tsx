import { useContext } from "react";
import ThemeContext from "../../../store/themeContext";
import classes from "./ThemeBox.module.scss";

function ThemeBox() {
  const themeCtx = useContext(ThemeContext);
  const theme = themeCtx.theme;
  return (
    <div className={classes.themeBox} onClick={() => themeCtx.toggleTheme()}>
      <div className={`${classes.toggle} ${
        theme === "dark" ? classes.darkMode :""
      }`}></div>
    </div>
  )

}

export default ThemeBox