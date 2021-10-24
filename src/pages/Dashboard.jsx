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
function Dashboard() {
  const [seizedItems, setseizedItems] = useState(null);
  const [selectedItem, setselectedItem] = useState(null);
  const [showAddNewItem, setshowAddNewItem] = useState(false);
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
    <div className="dashBoard__mainDiv">
      <div className="dashBoard__selectedItemDiv">
        {showAddNewItem && <AddNewItem setshowAddNewItem={setshowAddNewItem} />}
      </div>
      <div className="dashBoard__selectedItemDiv">
        {selectedItem && (
          <ShowSelectedItem
            selectedItem={selectedItem}
            setselectedItem={setselectedItem}
          />
        )}
      </div>
      <div className="seizedItems">
        <h2 className="h2_header">Siezed Items</h2>
        {seizedItems == null ? (
          "Loading..."
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
                      <td>{eachItem.id}</td>
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
      <button
        onClick={() => {
          setshowAddNewItem(true);
        }}
        className="dashboard__addNewSeizedItem"
      >
        add new seized item
      </button>
    </div>
  );
}

export default Dashboard;
