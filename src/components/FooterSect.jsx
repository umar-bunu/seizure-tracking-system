import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

import "../styles/LayoutStyles.css";
function FooterSect() {
  const [user, loading, error] = useAuthState(getAuth());
  return <div className="footerDiv"></div>;
}

export default FooterSect;
