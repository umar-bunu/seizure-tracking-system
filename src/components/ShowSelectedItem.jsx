import React, { useRef, useState } from "react";
import { getFirestore, updateDoc, doc, deleteDoc } from "firebase/firestore";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import "../styles/styles.css";
function ShowSelectedItem({ selectedItem, setselectedItem }) {
  const categoryRef = useRef(selectedItem.data.category);
  const importerAddressRef = useRef(selectedItem.data.importerAddress);
  const importerContactRef = useRef(selectedItem.data.importerContact);
  const importerNameREf = useRef(selectedItem.data.importerName);
  const itemNameRef = useRef(selectedItem.data.itemName);
  const quantityRef = useRef(selectedItem.data.quantity);

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
            <label htmlFor="quantity">Quantity: </label>
            <input
              name="quantity"
              defaultValue={selectedItem.data.quantity}
              type="text"
              ref={quantityRef}
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
                  <img
                    key={eachPic}
                    src={eachPic}
                    height="120px"
                    width="120px"
                  />
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
        </div>
      </div>
    </div>
  );
}

export default ShowSelectedItem;
