import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import CartProvider from "./store/CartProvider";
import store from "./store/index";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
