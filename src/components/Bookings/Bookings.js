import React from "react";
import { Box } from "@mui/material";
import Card from "../../UI/Card/Card";
import "./Bookings.css";

export default function Bookings({ details }) {
  console.log(details);
  return (
    <div className="book-container">
      <Box>
        <Card train={details} />
      </Box>
    </div>
  );
}
