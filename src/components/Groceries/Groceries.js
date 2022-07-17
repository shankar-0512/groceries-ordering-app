import { Fragment } from "react";

import MealsSummary from "./GrocerySummary";
import AvailableMeals from "./AvailableGroceries";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
