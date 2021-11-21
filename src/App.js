import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import HeaderSect from "./components/HeaderSect";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
// Import the functions you need from the SDKs you need
import { useAuthState } from "react-firebase-hooks/auth";

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Signup from "./pages/Signup";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3CDzlU_CPcSTSDyrUs0R9uXooXpQU2PM",
  authDomain: "seizure-tracking-system.firebaseapp.com",
  projectId: "seizure-tracking-system",
  storageBucket: "seizure-tracking-system.appspot.com",
  messagingSenderId: "378852790166",
  appId: "1:378852790166:web:ef2cb439292b77736217b7",
};

// Initialize Firebase

initializeApp(firebaseConfig);

function App() {
  useEffect(() => {
    document.title = "Seizure Tracking System";
  }, []);
  const [user, loading, error] = useAuthState(getAuth());
  return (
    <div className="main__div">
      <Switch>
        <Route exact path="/" render={(props) => <Login />} />
        {user && !loading && (
          <Route path="/dashboard" render={(props) => <Dashboard />} />
        )}
        <Route path="/signup" render={(props) => <Signup />} />
      </Switch>
    </div>
  );
}

export default App;
