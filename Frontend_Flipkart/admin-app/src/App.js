import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./containers/Signup";
import Signin from "./containers/Signin";
import Home from "./containers/Home";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { isUserLoggedIn } from "./actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) dispatch(isUserLoggedIn());
  }, []);

  return (
    <div className="App">
      {/* <Router> */}
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        {/*<PrivateRoute path="/page" component={NewPage} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} /> */}
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/" exact component={Home} /> */}
      </Switch>
      {/* </Router> */}
    </div>
  );
}

export default App;
