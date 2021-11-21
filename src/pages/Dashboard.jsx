import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import {
  orderBy,
  collection,
  query,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import ShowSelectedItem from "../components/ShowSelectedItem";
import AddNewItem from "../components/AddNewItem";
import HeaderSect from "../components/HeaderSect";
import CreateNewUser from "../components/CreateNewUser";
function Dashboard() {
  const [seizedItems, setseizedItems] = useState(null);
  const [selectedItem, setselectedItem] = useState(null);
  const [showAddNewItem, setshowAddNewItem] = useState(false);
  const [showCreateNewUser, setshowCreateNewUser] = useState(null);
  const [showHeader, setshowHeader] = useState(true);
  const getSeizedItems = async () => {
    try {
      const db = getFirestore();
      const col = collection(db, "seizedItems");
      const q = query(col, orderBy("itemName", "desc"));
      onSnapshot(q, (snapshot) => {
        setseizedItems(
          snapshot.docs.map((eachsnap) => ({
            id: eachsnap.id,
            data: eachsnap.data(),
          }))
        );
      });
    } catch (e) {
      console.log(e);
      alert("Could not load seized items");
    }
  };

  useEffect(() => {
    getSeizedItems();
  }, []);
  return (
    <div>
      {showHeader == true && (
        <HeaderSect
          id="header__sect"
          setshowCreateNewUser={setshowCreateNewUser}
          className="header__sect"
        />
      )}
      <div className="dashBoard__mainDiv">
        <div className="dashboard__bodyDiv">
          <div className="dashBoard__selectedItemDiv">
            {showAddNewItem && (
              <AddNewItem
                setshowAddNewItem={setshowAddNewItem}
                setshowHeader={setshowHeader}
              />
            )}
          </div>
          <div className="dashBoard__selectedItemDiv">
            {showCreateNewUser && (
              <CreateNewUser setshowCreateNewUser={setshowCreateNewUser} />
            )}
          </div>
          <div className="dashBoard__selectedItemDiv">
            {selectedItem && (
              <ShowSelectedItem
                setshowHeader={setshowHeader}
                selectedItem={selectedItem}
                setselectedItem={setselectedItem}
              />
            )}
          </div>
          <div className="seizedItems">
            <h2 className="h2_header">
              Seized Items <br /> Below You are the list of seized items in the
              record
            </h2>
            <button
              onClick={() => {
                setshowAddNewItem(true);
              }}
              className="dashboard__addNewSeizedItem"
            >
              Add new seized item
            </button>
            {seizedItems == null ? (
              <div className="dashboard__table">"Loading..."</div>
            ) : (
              <div className="dashboard__table">
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <th>ID</th>
                        <th>Item name</th>
                        <th>Category</th>
                        <th>Importer</th>
                        <th>Contact</th>
                        <th>Date Seized</th>
                        <th>Quantity</th>
                      </tr>
                      {seizedItems.map((eachItem) => (
                        <tr
                          onClick={() => {
                            setselectedItem(eachItem);
                          }}
                          className="dashboard__tr__select"
                          key={eachItem.id}
                        >
                          <td
                            style={{
                              maxWidth: "80px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {eachItem.id}
                          </td>
                          <td>{eachItem.data.itemName}</td>
                          <td>{eachItem.data.category}</td>
                          <td>{eachItem.data.importerName}</td>
                          <td>{eachItem.data.importerContact}</td>
                          <td>{`${eachItem.data.time}`}</td>
                          <td>{eachItem.data.quantity}</td>
                        </tr>
                      ))}{" "}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
