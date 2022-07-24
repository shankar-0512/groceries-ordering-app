import classes from "./Orders.module.css";

function OrderedItems(props) {
  return (
    <section>
      <p>{props.name} x {props.amount}</p>
      <div className={classes.price}>{props.price}</div>
    </section>
  );
}
export default OrderedItems;
