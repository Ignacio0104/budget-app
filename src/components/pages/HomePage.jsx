import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { app } from "../../firebase/fibaseConfig";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import "./HomePage.css";
import ExpensesCard from "../pure/ExpensesCard";
import GoalsCard from "../pure/GoalsCard";

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser;

  //sPD5Hvs6xXgIWmDcIQlK2dBd3B12

  const fetchUserData = async () => {
    const docRef = collection(db, "expenses");
    const goalsDocRef = collection(db, "goals");
    const queryString = query(docRef, where("userUID", "==", user.uid));
    const expensesSnapshot = await getDocs(queryString);
    const goalsQueryString = query(
      goalsDocRef,
      where("userUID", "==", user.uid)
    );
    const goalsSnapshot = await getDocs(goalsQueryString);
    setExpenses(expensesSnapshot.docs);
    setGoals(goalsSnapshot.docs);
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="home-main-contaner">
      <ExpensesCard expenses={expenses} />
      <GoalsCard goals={goals} />
    </div>
  );
};

export default HomePage;
