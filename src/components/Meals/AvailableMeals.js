import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const {
    isLoading: mealsIsLoading,
    error: mealsError,
    sendRequest: sendMealsRequest,
    response: mealsResponse,
    resetError: resetMealsError,
    resetResponse: resetMealsResponse,
  } = useHttp();

  //Request to backend for verification email
  const FetchMeals = async () => {
    sendMealsRequest({
      url: "https://space-ticket-booking-java.herokuapp.com/api/protected/verifyUser",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
      errorMsg: "Request failed!",
    });
  };

  useEffect(() => {
    FetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = mealsResponse.map((meal) => (
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
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;