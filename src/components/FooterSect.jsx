import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

import "../styles/LayoutStyles.css";
function FooterSect() {
  const [user, loading, error] = useAuthState(getAuth());
  return (
    <div className="footerDiv">
      <div>Home</div>
      <button>dashboard</button>
      <div>{user && !loading ? "Log out" : "Login"}</div>
    </div>
  );
}

export default FooterSect;
