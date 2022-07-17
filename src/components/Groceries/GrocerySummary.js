import classes from "./GrocerySummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Fresh Groceries, Delivered To You</h2>
      <p>Choose your favorite groceries from our farm fresh marts near you.</p>
      <p>
        All our groceries are packed with absolute care, hygiene and ofcourse,
        with lots of Love!{" "}
      </p>
    </section>
  );
};

export default MealsSummary;
