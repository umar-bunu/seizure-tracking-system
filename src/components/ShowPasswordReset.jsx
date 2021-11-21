import React, { useRef } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "../styles/styles.css";
function ShowPasswordReset({ setshouldShowPasswordReset }) {
  const userEmail = useRef("");
  return (
    <div className="showPassword__mainDiv">
      <div className="showPasswordHeaderDiv">
        <button
          onClick={() => {
            setshouldShowPasswordReset(null);
          }}
          className="showPassword__h1Tag"
        >
          X
        </button>
      </div>
      <input
        className="showPassword__input"
        placeholder="Enter your email"
        type="text"
        ref={userEmail}
      />
      <button
        className="showPassword__submitBtn"
        onClick={async () => {
          if (userEmail.current.value != "") {
            try {
              await sendPasswordResetEmail(getAuth(), userEmail.current.value);
              alert("success. Check your email for further instructions");
              setshouldShowPasswordReset(null);
            } catch (e) {
              alert("Something went wrong. Error!");
            }
          }
        }}
      >
        Get Password Reset Link
      </button>
    </div>
  );
}

export default ShowPasswordReset;
