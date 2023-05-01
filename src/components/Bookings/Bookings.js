import React from "react";
import { Box } from "@mui/material";
import Card from "../../UI/Card/Card";

export default function Bookings({ details }) {
  console.log(details);
  return (
    <div className="booking-container">
      <Box>
        <Card train={details} />
      </Box>
    </div>
  );
}
