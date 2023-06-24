import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../firebase/fibaseConfig";
import { getAuth } from "firebase/auth";

const useFirebase = () => {
  const [expenses, setExpenses] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth?.currentUser;
  const uid = auth?.currentUser?.uid;

  const fetchUserData = async (databaseName) => {
    if (auth) {
      const docRef = doc(db, databaseName, uid);
      const docSnap = await getDoc(docRef);
      docSnap.data();
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let data = docSnap.data();
          setExpenses(data);
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

  return { expenses, db, auth, uid, user, fetchUserData, updateItemDb };
};

export default useFirebase;
