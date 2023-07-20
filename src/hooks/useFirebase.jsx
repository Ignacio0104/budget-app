import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { app } from "../firebase/fibaseConfig";
import { getAuth } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const useFirebase = () => {
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth?.currentUser;
  const uid = auth?.currentUser?.uid;
  const storage = getStorage(app);

  const fetchUserData = async (databaseName) => {
    try {
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
    } catch (e) {
      return { response: "FAIL", data: e.message };
    }
  };

  const updateItemDb = async (dbName, newObject) => {
    await setDoc(doc(db, dbName, uid), newObject, { merge: true });
  };
  function extractFilename(url) {
    const regex = /\/o\/([^\/]+)%2F([^?]+)/;
    const matches = url.match(regex);
    if (matches && matches.length === 3) {
      const folder = matches[1];
      const filenameWithSpaces = matches[2];
      const filename = filenameWithSpaces.replace(/%20/g, " "); // Eliminar los espacios (%20)
      return { folder, filename };
    } else {
      // Manejar caso de URL no válida
      return null;
    }
  }

  const removeField = async (dbName, goal) => {
    let docRef = doc(db, dbName, uid);
    if (dbName === "goals") {
      const imageRef = extractFilename(goal.image);
      let photoRef = ref(storage, `${imageRef.folder}/${imageRef.filename}`);
      await deleteObject(photoRef);
    }
    await updateDoc(docRef, {
      [goal.key]: deleteField(),
    });
  };

  const updloadFile = async (goalToSubmit, selectedImage) => {
    if (selectedImage !== "") {
      const storageRef = ref(storage, `${uid}/${goalToSubmit.description}`);
      const snapshot = await uploadBytes(storageRef, selectedImage.url);
      const data = await getDownloadURL(storageRef);
      return data;
    }
  };

  return {
    db,
    auth,
    uid,
    user,
    fetchUserData,
    updateItemDb,
    updloadFile,
    removeField,
  };
};

export default useFirebase;
