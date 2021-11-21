import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/LoginStyles.css";
import ShowPasswordReset from "../components/ShowPasswordReset";
function Signup() {
  const [user, loading, error] = useAuthState(getAuth());
  const history = useHistory();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(
        getAuth(),
        e.target.userEmail.value,
        e.target.userPassword.value
      );
      history.push("/dashboard");
    } catch (exception) {
      alert("error " + exception.code);
      console.log(exception);
    }
  };
  return (
    <div className="mainDiv">
      <div className="bodyDiv">
        {" "}
        <h1>Seizure Tracking System</h1>
        <h2>User Sign up</h2>
        <h3>Please Fill in the details below</h3>
        <form onSubmit={handleSubmit} className="loginForm">
          <label htmlFor="userEmail">Email: </label>
          <input
            className="login__input"
            required
            type="email"
            name="userEmail"
          />
          <label htmlFor="userPassword">Password: </label>
          <input
            className="login__input"
            required
            type="password"
            name="userPassword"
          />
          <button className="login__submitBtn" type="submit">
            Sign up
          </button>
        </form>
        <button
          className="login__showPassword"
          onClick={() => {
            history.push("/");
          }}
        >
          Back to login
        </button>
      </div>
    </div>
  );
}

export default Signup;
