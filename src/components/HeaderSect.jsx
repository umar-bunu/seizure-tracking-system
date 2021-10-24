import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import "../styles/LayoutStyles.css";
import { getAuth } from "firebase/auth";
function HeaderSect() {
  const [user, loading, error] = useAuthState(getAuth());
  const history = useHistory();
  return (
    <div className="headerDiv">
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        Home
      </button>
      {getAuth().currentUser != null && !loading && (
        <button
          onClick={() => {
            history.push("/dashboard");
          }}
        >
          dashboard
        </button>
      )}{" "}
      <button
        onClick={async () => {
          if (getAuth().currentUser != null) {
            await getAuth().signOut();
          } else {
            history.push("/login");
          }
        }}
      >
        {getAuth().currentUser != null && !loading ? "Log out" : "Login"}
      </button>
    </div>
  );
}

export default HeaderSect;
