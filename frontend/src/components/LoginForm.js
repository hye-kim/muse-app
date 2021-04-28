import React, { useState } from "react";
import * as sessionActions from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./stylesheets/LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  let displayErrors = { display: "none" };
  if (errors.length > 0) {
    displayErrors = { display: "block" };
  }

  return (
    <div className="container">
      <div className="login-container">
        <div className="login-header">
          <h1>Sign In</h1>
        </div>
        <form onSubmit={handleSubmit} className="login">
          <ul style={displayErrors}>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>Username or Email</label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="callout">
          Don't have an account?{" "}
          <a href="/login">
            Sign up here.
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginFormPage;
