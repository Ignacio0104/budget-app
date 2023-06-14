import {
  collection,
  doc,
  getDoc,
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
import { Link } from "react-router-dom";
import SimulationCard from "../pure/SimulationCard";

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser;

  //sPD5Hvs6xXgIWmDcIQlK2dBd3B12

  const fetchUserData = async () => {
    const docRef = doc(db, "expenses", user.uid);
    const goalsDocRef = doc(db, "goals", user.uid);
    const expensesSnapshot = await getDoc(docRef);
    const goalsSnapshot = await getDoc(goalsDocRef);
    setExpenses(expensesSnapshot.data());
    setGoals(goalsSnapshot?.data());
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="home-main-contaner">
      <Link to={"/expenses"} state={{ userUID: user.uid }}>
        <ExpensesCard expenses={expenses} />
      </Link>
      <Link to={"/goals"} state={{ userUID: user.uid }}>
        <GoalsCard goals={goals} />
      </Link>
      <Link to={"/simulation"}>
        <SimulationCard />
      </Link>
    </div>
  );
};

export default HomePage;
