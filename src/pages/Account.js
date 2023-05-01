import React, { useEffect, useState, Fragment } from "react";
import LoginNavBar from "../components/Navbar/LoginNavbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

/* import Login from "./LogIn"; */
import Bookings from "../components/Bookings/Bookings";
import "../components/Bookings/Bookings.css";

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
        //console.log(train);
      }
    );
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="all-bookings">
      {console.log(train)}
      {train.map((trainName, index) => (
        <>
          <Bookings details={trainName} />
          {/* <p>{trainName.train_name}</p>
            <p>{trainName.train_number} </p> */}
        </>
      ))}
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
