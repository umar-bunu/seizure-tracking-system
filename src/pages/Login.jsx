import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../styles/styles.css";
function Login() {
  const [user, loading, error] = useAuthState(getAuth());
  const history = useHistory();
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
      <h2>Welcome back, Please sign in to continue</h2>
      <form onSubmit={handleSubmit} className="loginForm">
        <label htmlFor="userEmail">Email: </label>
        <input required type="email" name="userEmail" />
        <label htmlFor="userPassword">Password: </label>
        <input required type="password" name="userPassword" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
