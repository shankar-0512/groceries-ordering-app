import React, { useReducer, useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { loginActions } from "../../store/login-slice";
import LoginCard from "../UI/Card/LoginCard";
import Button from "../UI/Button/Button";
import Input from "../CommonInput/Input";
import styles from "../CommonInput/Input.module.css";
import classes from "./Login.module.css";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal";
import moment from "moment";

var currentPassword = "";

//************REDUCERS************//

function emailReducer(state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isvalid: state.value.includes("@") };
  }
  if (action.type === "CLEAR") {
    return { value: "", isvalid: null };
  }

  return { value: "", isvalid: false };
}

function passwordReducer(state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isvalid: state.value.trim().length > 6 };
  }
  if (action.type === "CLEAR") {
    return { value: "", isvalid: null };
  }

  return { value: "", isvalid: false };
}

function nameReducer(state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: action.val.trim() !== "" };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isvalid: state.value.trim() !== "" };
  }
  if (action.type === "CLEAR") {
    return { value: "", isvalid: null };
  }

  return { value: "", isvalid: false };
}

function rePasswordReducer(state, action) {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isvalid: action.val.trim() === currentPassword.trim(),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isvalid: state.value.trim() === currentPassword.trim(),
    };
  }
  if (action.type === "CLEAR") {
    return { value: "", isvalid: null };
  }

  return { value: "", isvalid: false };
}

function addressReducer(state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: action.val.trim().length > 10 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isvalid: state.value.trim().length > 10 };
  }
  if (action.type === "CLEAR") {
    return { value: "", isvalid: null };
  }

  return { value: "", isvalid: false };
}

function Login(props) {
  //************DECLARATIONS************//

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //STATES
  const [formisvalid, setFormisvalid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isvalid: null,
  });

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isvalid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isvalid: null,
  });

  const [rePasswordState, dispatchRePassword] = useReducer(rePasswordReducer, {
    value: "",
    isvalid: null,
  });

  const [addressState, dispatchAddress] = useReducer(addressReducer, {
    value: "",
    isvalid: null,
  });

  //REFS
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const rePasswordInputRef = useRef();
  const addressInputRef = useRef();

  const {
    isLoading,
    error,
    sendRequest: sendTaskRequest,
    response,
    resetError,
    resetResponse,
  } = useHttp();

  //checking for form validity every 500ms
  useEffect(
    function () {
      const identifier = setTimeout(() => {
        if (props.signUpFlag) {
          setFormisvalid(
            nameState.isvalid &&
              emailState.isvalid &&
              passwordState.isvalid &&
              rePasswordState.isvalid &&
              addressState.isvalid
          );
        } else {
          setFormisvalid(emailState.isvalid && passwordState.isvalid);
        }
      }, 200);

      return function clearTimer() {
        clearTimeout(identifier);
      };
    },
    //use effect dependencies - will re run every time below dependencies change.
    //Therefore useffect is guaranteed to use the latest state.
    [
      nameState.isvalid,
      emailState.isvalid,
      passwordState.isvalid,
      rePasswordState.isvalid,
      addressState.isvalid,
      props.signUpFlag,
      formisvalid,
    ]
  );

  //************API CALLS************//

  //Request to backend for login and sign-up
  const SignUpRequestHandler = async (requestJson) => {
    sendTaskRequest({
      url: "https://groceries-ordering-app-java.herokuapp.com/api/protected/loginAuth",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        name: requestJson.enteredName,
        email: requestJson.enteredEmail,
        password: requestJson.enteredPassword,
        rePassword: requestJson.enteredRePassword,
        address: requestJson.enteredAddress,
        signUpF: requestJson.signUpFlag,
      },
      errorMsg: "Request failed!",
    });
  };

  //************STATE HANDLERS************//

  function nameChangeHandler(event) {
    dispatchName({ type: "USER_INPUT", val: event.target.value });
  }
  function validateNameHandler() {
    dispatchName({ type: "INPUT_BLUR" });
  }
  function emailChangeHandler(event) {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  }
  function validateEmailHandler() {
    dispatchEmail({ type: "INPUT_BLUR" });
  }
  function passwordChangeHandler(event) {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    currentPassword = event.target.value;
  }
  function validatePasswordHandler() {
    dispatchPassword({ type: "INPUT_BLUR" });
  }
  function rePasswordChangeHandler(event) {
    dispatchRePassword({ type: "USER_INPUT", val: event.target.value });
  }
  function validateRePasswordHandler() {
    dispatchRePassword({ type: "INPUT_BLUR" });
  }
  function addressChangeHandler(event) {
    dispatchAddress({ type: "USER_INPUT", val: event.target.value });
  }
  function validateAddressHandler() {
    dispatchAddress({ type: "INPUT_BLUR" });
  }


  //************ACTION HANDLERS************//

  function submitHandler(event) {
    event.preventDefault();

    if (props.signUpFlag) {
      const enteredName = nameState.value;
      const enteredEmail = emailState.value;
      const enteredPassword = passwordState.value;
      const enteredRePassword = rePasswordState.value;
      const enteredAddress = addressState.value;

      if (formisvalid) {
        const requestJson = {
          enteredName,
          enteredEmail,
          enteredPassword,
          enteredRePassword,
          enteredAddress,
          signUpFlag: "Y",
        };

        SignUpRequestHandler(requestJson);
        setFormisvalid(false);
        props.postSignUp();
        dispatchName({ type: "CLEAR" });
        dispatchEmail({ type: "CLEAR" });
        dispatchPassword({ type: "CLEAR" });
        dispatchRePassword({ type: "CLEAR" });
        dispatchAddress({ type: "CLEAR" });
      }
    } else {
      const enteredEmail = emailState.value;
      const enteredPassword = passwordState.value;

      if (formisvalid) {
        const requestJson = {
          enteredEmail,
          enteredPassword,
          signUpFlag: "N",
        };

        SignUpRequestHandler(requestJson);
        setFormisvalid(false);
        dispatchEmail({ type: "CLEAR" });
        dispatchPassword({ type: "CLEAR" });
      }
    }
  }
  function closeErrorModal() {
    resetError();
    resetResponse();
  }

  if (response.responseCode === 0) {
    dispatch(loginActions.LoginStateHandler());
    dispatch(loginActions.UpdateUserId(response.userId));
    localStorage.setItem("isLoggedIn", 1);
    localStorage.setItem("userId", response.userId);
    closeErrorModal();
  }

  useEffect(() => {
    if (props.loginF) {
      navigate("/login");
    }
  }, [props.loginF, navigate]);

  //************MODALS************//

  const modalActions = (
    <div className={classes.actions}>
      <Button className={classes.btn} onClick={closeErrorModal}>
        Close
      </Button>
    </div>
  );

  const loginModalContent = (
    <React.Fragment>
      <div className={classes.total}>
        <span>{response.responseMessage}</span>
      </div>
    </React.Fragment>
  );

  //************LOADING SPINNERS************//

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <LoginCard className={classes.login}>
      {(error || response.responseCode !== undefined) && (
        <Modal onClose={props.onClose}>
          {loginModalContent}
          {modalActions}
        </Modal>
      )}
      <form onSubmit={submitHandler}>
        {props.sessionTimeout && (
          <p className={classes.error}>Session Expired! Please login again.</p>
        )}
        {props.signUpFlag && nameState.isvalid === false && (
          <p className={classes.error}>Name cannot be empty!</p>
        )}
        {props.signUpFlag && (
          <Input
            ref={nameInputRef}
            id="name"
            label="Name"
            type="text"
            isvalid={nameState.isvalid}
            value={nameState.value}
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
          />
        )}
        {emailState.isvalid === false && (
          <p className={classes.error}>Invalid E-Mail</p>
        )}
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isvalid={emailState.isvalid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        {passwordState.isvalid === false && props.signUpFlag && (
          <p className={classes.error}>
            Password should be greater than 6 characters!
          </p>
        )}
        {passwordState.isvalid === false && !props.signUpFlag && (
          <p className={classes.error}>Invalid Password</p>
        )}
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isvalid={passwordState.isvalid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        {props.signUpFlag && rePasswordState.isvalid === false && (
          <p className={classes.error}>Passwords do not match!</p>
        )}
        {props.signUpFlag && (
          <Input
            ref={rePasswordInputRef}
            id="rePassword"
            label="Confirm Password"
            type="password"
            isvalid={rePasswordState.isvalid}
            value={rePasswordState.value}
            onChange={rePasswordChangeHandler}
            onBlur={validateRePasswordHandler}
          />
        )}
        {props.signUpFlag && (
          <Input
            ref={addressInputRef}
            id="address"
            label="Address"
            type="text"
            isvalid={addressState.isvalid}
            value={addressState.value}
            onChange={addressChangeHandler}
            onBlur={validateAddressHandler}
          />
        )}
        {!props.signUpFlag && (
          <div className={classes.action}>
            <Button
              type="submit"
              disabled={!formisvalid && true}
            >
              Sign in
            </Button>
            <Outlet />
          </div>
        )}
        {props.signUpFlag && (
          <div className={classes.action}>
            <Button
              type="submit"
              disabled={!formisvalid && true}
            >
              Sign up
            </Button>
            <Outlet />
          </div>
        )}
      </form>
    </LoginCard>
  );
}

export default Login;
