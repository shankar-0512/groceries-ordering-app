import { useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AvailableGroceries.module.css";
import useHttp from "../../hooks/use-http";
import GroceryList from "./GroceryList";

const AvailableGroceries = () => {
  const {
    isLoading: groceriesIsLoading,
    sendRequest: sendGroceriesRequest,
    response: groceriesResponse,
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

  if (groceriesIsLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (groceriesResponse === "") {
    return (
      <section className={classes.MealsLoading}>
        <p>No groceries are available at this moment! Kindly check back later.</p>
      </section>
    );
  }

  return <GroceryList groceries={groceriesResponse} categoryUpdate={categoryUpdate} />;
};

export default AvailableGroceries;
