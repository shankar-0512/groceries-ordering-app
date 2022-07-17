import { useRef } from "react";
import MealItem from "./GroceryItem/GroceryItem";
import Card from "../UI/Card";
import classes from "./AvailableGroceries.module.css";
import styles from "../CommonInput/Input.module.css";

function MealList(props) {
  const categoriesRef = useRef();

  function categorySubmitHandler() {
    const category = categoriesRef.current.value;

    if (category !== "") {
      props.categoryUpdate(category);
    }
  }

  const mealsList = props.meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <div className={styles.control}>
          <label>Categories</label>
          <select
            ref={categoriesRef}
            className={classes.select}
            name="categoryList"
            id="class"
            onClick={categorySubmitHandler}
          >
            <option value="" style={{ color: "grey" }}>
              Select
            </option>
            <option value="Fruits" style={{ color: "black" }}>
              Fruits
            </option>
            <option value="Vegetables" style={{ color: "black" }}>
              Vegetables
            </option>
            <option value="Munchies" style={{ color: "black" }}>
              Munchies
            </option>
            <option value="Biscuits" style={{ color: "black" }}>
              Biscuits
            </option>
            <option value="Drinks" style={{ color: "black" }}>
              Drinks
            </option>
          </select>
        </div>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}
export default MealList;
