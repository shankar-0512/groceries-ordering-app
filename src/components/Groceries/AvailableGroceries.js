import { useEffect, useState } from "react";

import classes from "./AvailableGroceries.module.css";
import useHttp from "../../hooks/use-http";
import GroceryList from "./GroceryList";

const AvailableMeals = () => {
  const {
    isLoading: mealsIsLoading,
    sendRequest: sendGroceriesRequest,
    response: mealsResponse,
  } = useHttp();

  const [category, setCategory] = useState("");

  //Request to backend for fetching groceries
  const FetchGroceries = async (requestJson) => {
    sendGroceriesRequest({
      url: "https://groceries-ordering-app-java.herokuapp.com/api/protected/fetchGroceries",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: { category: requestJson.category },
      errorMsg: "Request failed!",
    });
  };

  useEffect(() => {
    const requestJson = { category };
    FetchGroceries(requestJson);
  }, [category]);

  function categoryUpdate(userCategory) {
    setCategory(userCategory);
  }

  console.log(category);

  if (mealsIsLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (mealsResponse === "") {
    return (
      <section className={classes.MealsLoading}>
        <p>No groceries are available at this moment! Kindly check back later.</p>
      </section>
    );
  }

  return <GroceryList meals={mealsResponse} categoryUpdate={categoryUpdate} />;
};

export default AvailableMeals;
