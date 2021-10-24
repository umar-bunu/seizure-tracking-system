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
function AddNewItem({ setshowAddNewItem }) {
  const categoryRef = useRef("");
  const importerAddressRef = useRef("");
  const importerContactRef = useRef("");
  const importerNameREf = useRef("");
  const itemNameRef = useRef("");
  const quantityRef = useRef("");

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
            <label htmlFor="quantity">Quantity: </label>
            <input name="quantity" type="text" ref={quantityRef} />
          </div>
          <div className="showSelectedItemSingleItem">
            <label htmlFor="dateChange">
              Date:{" "}
              {`${timeState.getDate()}/${timeState.getMonth()}/${timeState.getFullYear()}`}{" "}
              &nbsp;
            </label>
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
          <div className="showSelectedItemPictureDiv">
            <h6>
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
