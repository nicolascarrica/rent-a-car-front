import React, { useContext, useRef } from "react";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import classes from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../store/loginContext";
import images from "../../constants/images";

function LoginBox() {
  const loginCtx = useContext(LoginContext);
  const userNameRef = useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();

  let isValid = true;
  function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    isValid = userNameRef.current?.value === "admin";
    if (userNameRef.current) {
      if (isValid) {
        loginCtx.toggleLogin();
        navigate("/");
      } else {
        userNameRef.current.focus();
        errorMessageRef.current?.setAttribute(
          "style",
          "display: inline-block;opacity: 1"
        );
      }
    }
  }

  return (
    <div
      className={classes.container} 
    >
      <div className={classes.loginBox}>
        <div className={classes.logo}>
          <img src={images.logo} alt="digikala" />
        </div>
        <h2 className={classes.title}>{("Login Page")}</h2>
        <form onSubmit={loginHandler}>
          <Input
            ref={userNameRef}
            type={"text"}
            id={"User Name"}
            placeholder={"admin"}
          />
          <span ref={errorMessageRef} className={classes.errorMessage}>
            {("Error Message")}
          </span>
          <Input
            type={"Password"}
            id={"pass"}
            value={"admin"}
            readonly={true}
          />
          <Button type="submit">{("Login")}</Button>
          <Link className={classes.forgat_pass} to="/">
            {("Forget Pass")}
          </Link>
          <div className={classes.checkbox}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">{("Remember Me")}</label>
          </div>
        </form>
      </div>

      <div className={classes.keyPic}>
        <img
          src={images.dashboard}
          alt="illustrator key"
        />
      </div>
    </div>
  );
}

export default LoginBox;