import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import groceryImage from "../../assets/grocery.jpg";
import classes from "./Header.module.css";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login-slice";

const Header = (props) => {
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(loginActions.LoginStateHandler());
    localStorage.clear();
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <h1 className={classes.h1}>KWIKMART</h1>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink
                to="/groceries/orderHistory"
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
              >
                ORDER HISTORY
              </NavLink>
            </li>

            <HeaderCartButton onClick={props.onShowCart} />

            <li>
              <NavLink
                to="/login"
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                onClick={logoutHandler}
              >
                LOGOUT
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className={classes["main-image"]}>
        <img src={groceryImage} alt="A table full of fresh groceries!" />
      </div>
    </Fragment>
  );
};

export default Header;
