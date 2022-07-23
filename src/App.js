import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import Groceries from "./components/Groceries/Groceries";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Login from "./components/LoginAuth/Login";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "./store/login-slice";
import classes from "./components/UI/Button/Button.module.css";
import Button from "./components/UI/Button/Button";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  //LOGIN AND SIGNUP LOGIC
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpFlag, setSignUpFlag] = useState(true);
  const [navigateLoginF, setNavigateLoginF] = useState(true);

  const [sessionTimeout, setSessionTimeout] = useState(false);

  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  function postSignUpHandler() {
    setSignUpFlag(true);
    setNavigateLoginF(true);
  }

  function resetNavigateLoginF() {
    setNavigateLoginF(false);
  }

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("setupTime", now);
      setSessionTimeout(false);
      navigate("/groceries");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    var hours = 6; // to clear the localStorage after 1 hour
    // (if someone want to clear after 8hrs simply change hours=8)
    var now = new Date().getTime();
    var setupTime = localStorage.getItem("setupTime");
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        dispatch(loginActions.LoginStateHandler());
        setSessionTimeout(true);
        localStorage.clear();
      }
    }
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("userId");
    if (loggedInUser) {
      dispatch(loginActions.LoginStateHandler());
      dispatch(loginActions.UpdateUserId(userId));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Groceries
            onShowCart={showCartHandler}
            cartIsShown={cartIsShown}
            hideCartHandler={hideCartHandler}
          />
        }
      />
      <Route path="/login" element={<Login sessionTimeout={sessionTimeout} />}>
        <Route
          path=""
          element={
            <Link
              style={{ textDecoration: "none" }}
              className={classes.button}
              to={"/signUp"}
              onClick={resetNavigateLoginF}
            >
              New User?
            </Link>
          }
        />
      </Route>
      <Route
        path="/signUp"
        element={
          <Login
            signUpFlag={signUpFlag}
            postSignUp={postSignUpHandler}
            loginF={navigateLoginF}
          />
        }
      >
        <Route
          path=""
          element={
            <Link
              style={{ textDecoration: "none" }}
              className={classes.button}
              to={"/login"}
              onClick={postSignUpHandler}
            >
              Back
            </Link>
          }
        />
      </Route>
      <Route
        path="/groceries"
        element={
          <Groceries
            onShowCart={showCartHandler}
            cartIsShown={cartIsShown}
            hideCartHandler={hideCartHandler}
          />
        }
      />
      <Route path="/groceries/orderHistory" element={<OrderHistory />} />
    </Routes>
  );
}

export default App;
