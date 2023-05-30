import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import railwaybkg from "../../assets/bkg.jpg";
import Navbar from "../Navbar/Navbar";
import classes from "./Home.module.css";
import HomeBox from "../../UI/Box/HomeBox";
import { useStation } from "../../context/StationContext";
import { TextField, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import SearchTrains from "../SearchTrains/SearchTrains";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Navigate to="/dashboard" />; // If user is not logged in return to given URL
  }

  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div
      className={classes.page_container}
      style={{ backgroundImage: `url(${railwaybkg})` }}
    >
      <Navbar />
      <SearchTrains />
    </div>
  );
}
