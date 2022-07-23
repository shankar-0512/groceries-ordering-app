import { Fragment } from 'react';

import classes from './Layout.module.css';
import Header from './Header';

const Layout = (props) => {
  return (
    <Fragment>
      <Header onShowCart={props.onShowCart}/>
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
