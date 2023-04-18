import React from "react";
import classes from "./Dashboard.module.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import railwaybkg from "../assets/bkg.jpg";

import LoginNavBar from "../components/Navbar/LoginNavbar";

import SearchTrains from "../components/SearchTrains/SearchTrains";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  console.log(currentUser);
  console.log(currentUser.email);
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div
        className={classes.page_container}
        style={{ backgroundImage: `url(${railwaybkg})` }}
      >
        <LoginNavBar onClick={handleLogout} />
        <div className="p-4 box mt-3 text-center">
          Hello Welcome <br />
          {currentUser && currentUser.email}
        </div>
        <SearchTrains />
      </div>
    </>
  );
}
