import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import "../styles/styles.css";
function CreateNewUser({ setshowCreateNewUser }) {
  var isLoading = false;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    isLoading = true;
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(
        auth,
        e.target.userEmail.value,
        e.target.userPass.value
      );
      alert("success!. User created");
      setshowCreateNewUser(null);
    } catch (e) {
      alert("Error!. Could not create user");
    }
  };
  return (
    <div className="showSelectedItem__mainDiv">
      <div className="createNewUser__bodyDiv">
        <div className="showSelectedItem__headerDiv">
          <h3>Create New User</h3>
          <h1
            className="showSelectedItem__h1Tag"
            onClick={() => {
              setshowCreateNewUser(null);
            }}
          >
            X
          </h1>
        </div>
        <div className="showSelectedItemSectionDiv">
          <form onSubmit={handleSubmit}>
            <div className="CreateNewUserSingleItem">
              <label htmlFor="userEmail">Email: </label>
              <input type="email" name="userEmail" required />
            </div>
            <div className="CreateNewUserSingleItem">
              <label htmlFor="userPass">Password: </label>
              <input type="password" name="userPass" required />
            </div>
            <button className="createNewUserSaveBtn" type="submit">
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewUser;
