import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navbar from "./components/Navbar.js"
import SubNavbar from "./components/SubNavbar.js";
import SignupFormPage from "./components/SignupForm";
import LoginFormPage from "./components/LoginForm";
import Splash from "./components/Splash"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="header">
        <Navbar isLoaded={isLoaded} />
        <SubNavbar />
      </div>
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route path="/signup" component={SignupFormPage} />
          <Route path="/login" component={LoginFormPage} />
        </Switch>
      )}
    </>
  );
}

export default App;
