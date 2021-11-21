import React, { useRef, useState, useEffect } from "react";
import { getFirestore, updateDoc, doc, deleteDoc } from "firebase/firestore";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import "../styles/ShowSelectedItemStyles.css";
function ShowSelectedItem({ selectedItem, setselectedItem, setshowHeader }) {
  const categoryRef = useRef(selectedItem.data.category);
  const importerAddressRef = useRef(selectedItem.data.importerAddress);
  const importerContactRef = useRef(selectedItem.data.importerContact);
  const importerNameREf = useRef(selectedItem.data.importerName);
  const itemNameRef = useRef(selectedItem.data.itemName);
  const quantityRef = useRef(selectedItem.data.quantity);
  const dobRef = useRef(selectedItem.data.dob);
  const leaderRankRef = useRef(selectedItem.data.leaderRank);

  const offenceRef = useRef(selectedItem.data.offence);
  const sexRef = useRef(selectedItem.data.sex);
  const teamLeaderRef = useRef(selectedItem.data.teamLeader);
  const leaderServiceNoRef = useRef(selectedItem.data.leaderServiceNo);
  const licenseNoRef = useRef(selectedItem.data.licenseNo);
  const locationRef = useRef(selectedItem.data.location);
  const portRef = useRef(selectedItem.data.port);
  const teamRef = useRef(selectedItem.data.team);
  const transportMeansRef = useRef(selectedItem.data.transportMeans);

  const [storageUrls, setstorageUrls] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  var myDate = selectedItem.data.time.split("-");
  const [timeState, settimeState] = useState(
    new Date(myDate[2], myDate[1], myDate[0])
  );
  const [selectedPictures, setselectedPictures] = useState(null);
  return (
    <div className="showSelectedItem__mainDiv">
      <div className="showSelectedItem__bodyDiv">
        <div className="showSelectedItem__headerDiv">
          <button
            onClick={() => {
              var content = document.getElementsByClassName(
                "showSelectedItem__mainDiv"
              );

              setshowHeader(false);
              setTimeout(() => {
                window.print();
                setshowHeader(true);
              }, 1000);
            }}
            className="printBtn"
          >
            Print
          </button>
          <h3
            className="showSelectedItem__deleteItem"
            onClick={async () => {
              try {
                // eslint-disable-next-line no-restricted-globals
                let shouldDelete = confirm(
                  "Are you sure you want to delete this document?"
                );
                if (shouldDelete == true) {
                  const db = getFirestore();
                  deleteDoc(doc(db, "seizedItems", selectedItem.id));
                  alert("document deleted");
                  setselectedItem(null);
                }
              } catch (e) {
                alert("Error!! could not delete document.");
                return;
              }
            }}
          >
            Delete document
          </h3>
          <h1
            className="showSelectedItem__h1Tag"
            onClick={() => {
              setselectedItem(null);
            }}
          >
            X
          </h1>
        </div>
        <div className="showSelectedItemSectionDiv">
          <div className="showSelectedItemSingleItem">
            <label htmlFor="itemName">Item: </label>
            <input
              name="itemName"
              defaultValue={selectedItem.data.itemName}
              type="text"
              ref={itemNameRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="itemCat">Category: </label>
            <input
              name="itemCat"
              defaultValue={selectedItem.data.category}
              type="text"
              ref={categoryRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="importAddr">Importer Address: </label>
            <input
              defaultValue={selectedItem.data.importerAddress}
              type="text"
              ref={importerAddressRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="ImporterCont">Importer Contact: </label>
            <input
              name="importerCont"
              defaultValue={selectedItem.data.importerContact}
              type="text"
              ref={importerContactRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="importerName">Importer Name: </label>
            <input
              name="importerName"
              defaultValue={selectedItem.data.importerName}
              type="text"
              ref={importerNameREf}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="quantity">Offence: </label>
            <input
              name="quantity"
              defaultValue={selectedItem.data.offence}
              type="text"
              ref={offenceRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="sex">Sex: </label>
            <input
              name="sex"
              defaultValue={selectedItem.data.sex}
              type="text"
              ref={sexRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="dob">DOB: </label>
            <input
              name="dob"
              defaultValue={selectedItem.data.dob}
              type="text"
              ref={dobRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="licenseNo">License No: </label>
            <input
              name="licenseNo"
              defaultValue={selectedItem.data.licenseNo}
              type="text"
              ref={licenseNoRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="Location">Location: </label>
            <input
              name="Location"
              defaultValue={selectedItem.data.location}
              type="text"
              ref={locationRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="quantity">Quantity: </label>
            <input
              name="quantity"
              defaultValue={selectedItem.data.quantity}
              type="text"
              ref={quantityRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="transportMeans">Transport Means: </label>
            <input
              name="transportMeans"
              defaultValue={selectedItem.data.transportMeans}
              type="text"
              ref={transportMeansRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="teamLeader">Team Leader: </label>
            <input
              name="teamLeader"
              defaultValue={selectedItem.data.teamLeader}
              type="text"
              ref={teamLeaderRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="portNo">Port: </label>
            <input
              name="portNo"
              defaultValue={selectedItem.data.port}
              type="text"
              ref={portRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="team">Team: </label>
            <input
              name="team"
              defaultValue={selectedItem.data.team}
              type="text"
              ref={teamRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="leaderServiceNo">leaderServiceNo: </label>
            <input
              name="leaderServiceNo"
              defaultValue={selectedItem.data.leaderServiceNo}
              type="text"
              ref={leaderServiceNoRef}
            />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="leaderRank">Leader Rank: </label>
            <input
              name="leaderRank"
              defaultValue={selectedItem.data.leaderRank}
              type="text"
              ref={leaderRankRef}
            />
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

                const picturesTemp =
                  storageUrls.length > 0
                    ? storageUrls
                    : selectedItem.data.pictures;
                await updateDoc(doc(db, "seizedItems", selectedItem.id), {
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
                  pictures: picturesTemp,
                });
                setisLoading(false);
                alert("success!!! Data updated.");
                setselectedItem(false);
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

          <button
            className="cancelBtn"
            onClick={() => {
              setselectedItem(null);
            }}
          >
            Cancel
          </button>
        </div>
        <div className="showSelectedItemPictureDiv">
          <h5>
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
              className="uploadBtn"
              onClick={async () => {
                if (selectedPictures == null || selectedPictures.length == 0) {
                  alert("No pictures selected");
                } else {
                  if (isLoading) {
                    alert("Already loading");
                    return;
                  }
                  setisLoading(true);

                  try {
                    const storage = getStorage();
                    await selectedItem.data.pictures.forEach(
                      async (eachitem, index) => {
                        const docRef = ref(
                          storage,
                          selectedItem.id + "/" + index
                        );
                        await deleteObject(docRef);
                      }
                    );
                  } catch (e) {
                    console.log(e);
                  }
                  try {
                    const storage = getStorage();

                    const isDone = Array.from(selectedPictures).map(
                      (eachPic) => false
                    );
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
                            setstorageUrls([...storageUrls, downdloadUrl]);

                            if (!isDone.includes(false)) {
                              setisLoading(false);
                              alert("Sucess!!. Pictures uploaded");
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
          </h5>
          {selectedPictures == null || selectedPictures.length == 0
            ? selectedItem.data.pictures.map((eachPic) => (
                <img key={eachPic} src={eachPic} height="120px" width="120px" />
              ))
            : selectedPictures.map((eachPic) => (
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
  );
}

export default ShowSelectedItem;
