import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown() {
  const [classes, setClass] = React.useState("");

  const handleChange = (event) => {
    setClass(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">
          All Classes
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={classes}
          label="All Classes"
          onChange={handleChange}
        >
          <MenuItem value={0}>
            <em>All Classes</em>
          </MenuItem>
          <MenuItem value={10}>AC First Class (1A)</MenuItem>
          <MenuItem value={20}>AC 2 Tier (2A)</MenuItem>
          <MenuItem value={30}>Exec Chair Car (CC)</MenuItem>
          <MenuItem value={40}>AC 3 Tier (3A)</MenuItem>
          <MenuItem value={50}>AC Chair Car (CC)</MenuItem>
          <MenuItem value={60}>Sleeper (SL)</MenuItem>
          <MenuItem value={70}>Second Sitting (2S)</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
