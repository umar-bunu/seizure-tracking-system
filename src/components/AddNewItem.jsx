import React, { useRef, useState } from "react";
import {
  getFirestore,
  addDoc,
  updateDoc,
  doc,
  collection,
} from "firebase/firestore";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "../styles/styles.css";
function AddNewItem({ setshowAddNewItem, setshowHeader }) {
  const categoryRef = useRef("");
  const importerAddressRef = useRef("");
  const importerContactRef = useRef("");
  const importerNameREf = useRef("");
  const itemNameRef = useRef("");
  const quantityRef = useRef("");
  const dobRef = useRef("");
  const leaderRankRef = useRef("");

  const offenceRef = useRef("");
  const sexRef = useRef("");
  const teamLeaderRef = useRef("");
  const leaderServiceNoRef = useRef("");
  const licenseNoRef = useRef("");
  const locationRef = useRef("");
  const portRef = useRef("");
  const teamRef = useRef("");
  const transportMeansRef = useRef("");

  const [storageUrls, setstorageUrls] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  var today = new Date();
  const [timeState, settimeState] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [selectedPictures, setselectedPictures] = useState([]);
  const [selectedItem, setselectedItem] = useState(null);
  return (
    <div className="showSelectedItem__mainDiv">
      <div className="showSelectedItem__bodyDiv">
        <div className="showSelectedItem__headerDiv">
          <button
            className="printBtn"
            onClick={() => {
              setshowHeader(false);
              setTimeout(() => {
                window.print();
                setshowHeader(true);
              }, 1000);
            }}
          >
            {" "}
            Print
          </button>
          <h1
            className="showSelectedItem__h1Tag"
            onClick={() => {
              setshowAddNewItem(null);
            }}
          >
            X
          </h1>
        </div>
        <div className="showSelectedItemSectionDiv">
          <div className="showSelectedItemSingleItem">
            <label htmlFor="itemName">Item: </label>
            <input name="itemName" type="text" ref={itemNameRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="itemCat">Category: </label>
            <input name="itemCat" type="text" ref={categoryRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="importAddr">Importer Address: </label>
            <input type="text" ref={importerAddressRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="ImporterCont">Importer Contact: </label>
            <input name="importerCont" type="text" ref={importerContactRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="importerName">Importer Name: </label>
            <input name="importerName" type="text" ref={importerNameREf} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="quantity">Offence: </label>
            <input name="quantity" type="text" ref={offenceRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="sex">Sex: </label>
            <input name="sex" type="text" ref={sexRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="dob">DOB: </label>
            <input name="dob" type="text" ref={dobRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="licenseNo">License No: </label>
            <input name="licenseNo" type="text" ref={licenseNoRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="Location">Location: </label>
            <input name="Location" type="text" ref={locationRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="quantity">Quantity: </label>
            <input name="quantity" type="text" ref={quantityRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="transportMeans">Transport Means: </label>
            <input name="transportMeans" type="text" ref={transportMeansRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="teamLeader">Team Leader: </label>
            <input name="teamLeader" type="text" ref={teamLeaderRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="portNo">Port: </label>
            <input name="portNo" type="text" ref={portRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="team">Team: </label>
            <input name="team" type="text" ref={teamRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="leaderServiceNo">leaderServiceNo: </label>
            <input
              name="leaderServiceNo"
              type="text"
              ref={leaderServiceNoRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="leaderRank">Leader Rank: </label>
            <input name="leaderRank" type="text" ref={leaderRankRef} />
          </div>

          <div className="showSelectedItemSingleItem">
            Date:{" "}
            {`${timeState.getDate()}/${timeState.getMonth()}/${timeState.getFullYear()}`}{" "}
            &nbsp;
            <input
              type="date"
              onChange={(e) => {
                settimeState(e.target.valueAsDate);
              }}
            />
          </div>

          <div className="showSelectedItemCancelSave">
            <button
              onClick={async () => {
                if (isLoading) {
                  alert("Item already loading");
                  return;
                }
                setisLoading(true);
                try {
                  const db = getFirestore();

                  var doc = await addDoc(collection(db, "seizedItems"), {
                    offence: offenceRef.current.value,
                    sex: sexRef.current.value,
                    dob: dobRef.current.value,
                    licenseNo: licenseNoRef.current.value,
                    location: locationRef.current.value,
                    transportMeans: transportMeansRef.current.value,
                    teamLeader: teamLeaderRef.current.value,
                    port: portRef.current.value,
                    team: teamRef.current.value,
                    leaderServiceNo: leaderServiceNoRef.current.value,
                    leaderRankRef: leaderRankRef.current.value,
                    category: categoryRef.current.value,
                    importerAddress: importerAddressRef.current.value,
                    importerContact: importerContactRef.current.value,
                    importerName: importerNameREf.current.value,
                    itemName: itemNameRef.current.value,
                    quantity: quantityRef.current.value,
                    time: `${timeState.getDate()}-${timeState.getMonth()}-${timeState.getFullYear()}`,
                    pictures: [],
                  });

                  setselectedItem({ id: doc.id });
                  setisLoading(false);
                  alert("success!!! Document created.");
                } catch (e) {
                  setisLoading(false);
                  console.log(e);
                  alert("could not update data");
                }
              }}
              className="submitBtn"
            >
              Save
            </button>
          </div>
          <div>
            <h6 className="AddItemPictureSection">
              Pictures:{" "}
              <input
                multiple
                type="file"
                accept="image/*"
                onChange={(e) => {
                  var tempPic = [];
                  for (var i = 0; i < e.target.files.length; i++) {
                    tempPic.push({
                      data: e.target.files[i],
                      path: URL.createObjectURL(e.target.files[i]),
                    });
                  }
                  setselectedPictures(tempPic);
                }}
              />
              <button
                onClick={async () => {
                  if (
                    selectedPictures == null ||
                    selectedPictures.length == 0
                  ) {
                    alert("No pictures selected");
                  } else {
                    if (isLoading) {
                      alert("Already loading");

                      return;
                    }
                    if (selectedItem == null) {
                      alert(
                        "Cannot upload document yet. Please click on create document first"
                      );
                      return;
                    }
                    setisLoading(true);

                    try {
                      const storage = getStorage();

                      const isDone = Array.from(selectedPictures).map(
                        (eachPic) => false
                      );
                      var storageUrlsTemp = [];
                      await selectedPictures.forEach(async (eachPic, index) => {
                        await uploadBytes(
                          ref(storage, `${selectedItem.id}/${index}`),
                          eachPic.data
                        )
                          .then((snapshot) => {})
                          .then(async (completed) => {
                            isDone[index] = true;
                            await getDownloadURL(
                              ref(storage, `${selectedItem.id}/${index}`)
                            ).then((downdloadUrl) => {
                              storageUrlsTemp.push(downdloadUrl);

                              if (!isDone.includes(false)) {
                                const db = getFirestore();
                                updateDoc(
                                  doc(db, "seizedItems", selectedItem.id),
                                  {
                                    pictures: storageUrlsTemp,
                                  }
                                ).then((_) => {
                                  setisLoading(false);
                                  alert("Sucess!!. Pictures uploaded");
                                  setshowAddNewItem(null);
                                });
                              }
                            });
                          });
                      });
                    } catch (e) {
                      setisLoading(false);
                    }
                  }
                }}
              >
                Upload
              </button>
            </h6>
            {selectedPictures.map((eachPic) => (
              <img
                key={eachPic}
                src={eachPic.path}
                height="120px"
                width="120px"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewItem;
