import OrderedItems from "./OrderedItems";
import classes from "./Orders.module.css";

function Orders(props) {
  const orderDetails = props.orderDetails.map((detail) => (
    <OrderedItems name={detail.name} price={detail.price} amount={detail.amount}/>
  ));

  return (
    <li className={classes.grocery}>
      {orderDetails}
    </li>
  );
}
export default Orders;
