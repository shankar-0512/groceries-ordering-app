import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import groceryImage from '../../assets/grocery.jpg';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Kwikmart</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={groceryImage} alt='A table full of fresh groceries!' />
      </div>
    </Fragment>
  );
};

export default Header;