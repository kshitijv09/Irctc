import * as React from "react";
import Box from "@mui/material/Box";
import classes from "./Box.module.css";
export default function HomeBox(props) {
  return (
    <div className={classes.search_box}>
      <Box
        className="box"
        sx={{
          width: 600,
          height: 420,
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "white",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        {props.children}
      </Box>
    </div>
  );
}
