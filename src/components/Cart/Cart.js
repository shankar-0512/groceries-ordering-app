import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const userName = useSelector((state) => state.login.userName);
  const userAddress = useSelector((state) => state.login.userAddress);

  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const {
    isLoading: orderIsLoading,
    sendRequest: orderGroceriesRequest,
    response: orderResponse,
    resetResponse: resetOrderResponse,
  } = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  //Request to backend for fetching groceries
  const submitOrderHandler = async (userData) => {
    orderGroceriesRequest({
      url: "https://groceries-ordering-app-java.herokuapp.com/api/protected/orderGroceries",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: { userDetails: userData, orderedItems: cartCtx.items },
      errorMsg: "Request failed!",
    });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
          userName={userName}
          userAddress={userAddress}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Confirming your order...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Your order has been placed successfully!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  if (orderResponse.responseCode === 0) {
    resetOrderResponse();
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  return (
    <Modal onClose={props.onClose}>
      {!orderIsLoading && !didSubmit && cartModalContent}
      {orderIsLoading && isSubmittingModalContent}
      {!orderIsLoading && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
