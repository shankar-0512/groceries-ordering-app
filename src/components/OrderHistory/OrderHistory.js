import Card from "../UI/Card/LoginCard";
import Layout from "../Layout/Layout";
import Orders from "./Orders";
import classes from "./OrderHistory.module.css";

const dummyOrders = [
  {
    orderedItems: [
      { name: "onion", price: 50, amount: 2 },
      { name: "tomato", price: 60, amount: 1 },
      { name: "potato", price: 20, amount: 1 },
      { name: "Carrot", price: 20, amount: 1 },
    ],
  },
  {
    orderedItems: [
      { name: "beetroot", price: 20, amount: 5 },
      { name: "apple", price: 90, amount: 3 },
    ],
  },
];

const orderList = dummyOrders.map((order) => (
  <Orders orderDetails={order.orderedItems} />
));

function OrderHistory() {
  return (
    <Layout>
      <section className={classes.groceries}>
        <ul>{orderList}</ul>
      </section>
    </Layout>
  );
}
export default OrderHistory;
