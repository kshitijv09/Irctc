import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import railwaybkg from "../../assets/bkg.jpg";
import Navbar from "../Navbar/Navbar";
import classes from "./Home.module.css";
import HomeBox from "../../UI/Box/HomeBox";
import { useStation } from "../../context/StationContext";
import { TextField, Button } from "@mui/material";

/* import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; */
import SearchTrains from "../SearchTrains/SearchTrains";

export default function Home() {
  const fromRef = useRef();
  const toRef = useRef();

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
