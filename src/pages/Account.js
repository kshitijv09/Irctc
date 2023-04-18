import React, { useEffect, useState, Fragment } from "react";
import LoginNavBar from "../components/Navbar/LoginNavbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Login from "./LogIn";

const RetrieveInfo = () => {
  const { currentUser } = useAuth();
  const [train, setTrain] = useState([]);

  const fetchPost = async () => {
    await getDocs(collection(db, `${currentUser.email}`)).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTrain(newData);
        console.log(train, newData);
      }
    );
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <div className="todo-content">
        {train?.map((trainName, i) => (
          <>
            <p key={i}>{trainName.TrainName}</p>
            <p>{trainName.TrainNumber} </p>
          </>
        ))}
      </div>
    </div>
  );
};

export default function Account() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <Fragment>
      <LoginNavBar />
      <RetrieveInfo />
    </Fragment>
  );
}
