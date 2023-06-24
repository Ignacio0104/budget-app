import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../firebase/fibaseConfig";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const useFirebase = () => {
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth?.currentUser;
  const uid = auth?.currentUser?.uid;
  const storage = getStorage(app);

  const fetchUserData = async (databaseName) => {
    if (auth) {
      const docRef = doc(db, databaseName, uid);
      const docSnap = await getDoc(docRef);
      docSnap.data();
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let data = docSnap.data();
          return { response: "OK", data: data };
        } else {
          return { response: "OK", data: [] };
        }
      } catch (error) {
        return { response: "FAIL", data: error.message };
      }
    }
  };

  const updateItemDb = async (dbName, newObject) => {
    await setDoc(doc(db, dbName, uid), newObject, { merge: true });
  };

  const updloadFile = async (goalToSubmit, selectedImage) => {
    const storageRef = ref(storage, `${uid}/${goalToSubmit.description}`);
    const snapshot = await uploadBytes(storageRef, selectedImage.url);
    const data = await getDownloadURL(storageRef);
    return data;
  };

  return { db, auth, uid, user, fetchUserData, updateItemDb, updloadFile };
};

export default useFirebase;
