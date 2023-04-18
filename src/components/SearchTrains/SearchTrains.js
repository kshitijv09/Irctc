import React, { useRef, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./SearchTrains.module.css";
import HomeBox from "../../UI/Box/HomeBox";
import { TextField, Button } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Datepicker from "../../UI/DatePicker/DatePicker";
import Dropdown from "../../UI/Dropdown/Dropdown";

export default function SearchTrains() {
  const [ArrivalStation, setArrivalStation] = useState();
  const [DestinationStation, setDestinationStation] = useState();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    navigate("/trainlist", {
      state: { fromS: ArrivalStation, toS: DestinationStation },
    });
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <HomeBox>
          <div className={classes.search_section}>
            <h2 className={classes.search_heading}>BOOK TICKET</h2>
            <div className={classes.search_input}>
              <form onSubmit={submitHandler}>
                <div className={classes.datepicker_container}>
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="From"
                      variant="outlined"
                      inputProps={{
                        style: {
                          height: "10px",
                        },
                      }}
                      InputLabelProps={{ style: { color: "darkblue" } }}
                      onChange={(event) => {
                        setArrivalStation(event.target.value);
                      }}
                    />
                  </div>
                  <div className={classes.datepicker}>
                    <Datepicker wrapperClassName="date-picker" />
                  </div>
                </div>
                <div className={classes.icon}>
                  <ImportExportIcon fontSize="large" />
                </div>
                <div
                  style={{ marginTop: "0.01em" }}
                  className={classes.dropdown_Container}
                >
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="To"
                      variant="outlined"
                      inputProps={{
                        style: {
                          height: "10px",
                        },
                      }}
                      InputLabelProps={{ style: { color: "darkblue" } }}
                      onChange={(event) => {
                        setDestinationStation(event.target.value);
                      }}
                    />
                  </div>
                  <div className={classes.dropdown}>
                    <Dropdown />
                  </div>
                </div>
                <div style={{ marginTop: "2em" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#fb792b" }}
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>

            {/* <DatePicker label="Basic date picker" /> */}
          </div>
        </HomeBox>

        <div className={classes.tagline_section}>
          <div className={classes.tagline_text}>
            <div className={classes.railways}>
              <h1 style={{ color: "white" }}> INDIAN RAILWAYS</h1>
            </div>
            <div className={classes.tagline}>
              <h3 style={{ color: "white" }}>
                {" "}
                Safety | Security| Punctuality
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
