import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../styles/LoginStyles.css";
import ShowPasswordReset from "../components/ShowPasswordReset";
function Login() {
  const [user, loading, error] = useAuthState(getAuth());
  const history = useHistory();
  const [shouldShowPasswordReset, setshouldShowPasswordReset] = useState(null);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(
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
    <div
      className={shouldShowPasswordReset == true ? "mainDivHidden" : "mainDiv"}
    >
      {shouldShowPasswordReset && (
        <ShowPasswordReset
          setshouldShowPasswordReset={setshouldShowPasswordReset}
        />
      )}
      <div className="bodyDiv">
        <h1>Seizure Tracking System</h1>
        <h2>Welcome back</h2>
        <h3>Please sign in to continue</h3>
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
            Login
          </button>
        </form>
        <button
          className="login__showPassword"
          onClick={() => {
            setshouldShowPasswordReset(true);
          }}
        >
          Forgot Password? Get Password Reset Link
        </button>{" "}
        <br />
        <button
          className="login__showPassword"
          onClick={() => {
            history.push("signup");
          }}
        >
          New User? Sign up
        </button>
      </div>
    </div>
  );
}

export default Login;
