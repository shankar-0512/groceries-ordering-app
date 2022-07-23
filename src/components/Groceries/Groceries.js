import GrocerySummary from "./GrocerySummary";
import AvailableGroceries from "./AvailableGroceries";
import Layout from "../Layout/Layout";
import Cart from "../Cart/Cart";

const Meals = (props) => {
  return (
    <Layout onShowCart={props.onShowCart}>
      {props.cartIsShown && <Cart onClose={props.hideCartHandler} />}
      <main>
        <GrocerySummary />
        <AvailableGroceries />
      </main>
    </Layout>
  );
};

export default Meals;
