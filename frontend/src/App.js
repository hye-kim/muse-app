import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navbar from "./components/Navbar.js";
import SubNavbar from "./components/SubNavbar.js";
import SignupFormPage from "./components/SignupForm";
import LoginFormPage from "./components/LoginForm";
import Splash from "./components/Splash";
import Footer from "./components/Footer";
import PoemView from "./components/PoemView";

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
          <Route exact path="/poems/:poemId" component={PoemView} />
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
