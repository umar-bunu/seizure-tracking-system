import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../styles/styles.css";
import ShowPasswordReset from "../components/ShowPasswordReset";
function Login() {
  const [user, loading, error] = useAuthState(getAuth());
  const history = useHistory();
  const [shouldShowPasswordReset, setshouldShowPasswordReset] = useState(true);
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
      alert("error");
      console.log(exception);
    }
  };
  return (
    <div className="mainDiv">
      {shouldShowPasswordReset && (
        <ShowPasswordReset
          setshouldShowPasswordReset={setshouldShowPasswordReset}
        />
      )}
      <h1>Welcome back</h1>
      <h2>Please sign in to continue</h2>
      <form onSubmit={handleSubmit} className="loginForm">
        <label htmlFor="userEmail">Email: </label>
        <input required type="email" name="userEmail" />
        <label htmlFor="userPassword">Password: </label>
        <input required type="password" name="userPassword" />
        <button type="submit">Login</button>
      </form>
      <button
        className="login__showPassword"
        onClick={() => {
          setshouldShowPasswordReset(true);
        }}
      >
        Forgot Password? Get Password Reset Link
      </button>
    </div>
  );
}

export default Login;
