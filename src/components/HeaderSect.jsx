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
      <div>Home</div>
      <div>profile</div>
      <div>dashboard</div>
      <button
        onClick={async () => {
          if (user && !loading) {
            await getAuth().signOut();
          } else {
            history.push("/login");
          }
        }}
      >
        {user && !loading ? "Log out" : "Login"}
      </button>
    </div>
  );
}

export default HeaderSect;
