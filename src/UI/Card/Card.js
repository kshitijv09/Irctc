import React from "react";
import classes from "./Card.module.css";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import { Button } from "react-bootstrap";
export default function Card({ train }) {
  return (
    <Fragment>
      <div className={classes.card_container}>
        <div className={classes.card_header}>
          <div>
            <h4>
              {train.train_name} ({train.train_number})
            </h4>
          </div>
          <div>
            <p>
              Runs on:
              {train.run_days.map((day) => {
                return <span>{day} </span>;
              })}
            </p>
          </div>
          <h5 style={{ color: "blue" }}>Train Schedule</h5>
        </div>
        <div className={classes.train_info}>
          <div>
            <h4>
              {train.depart_time}|{train.train_origin_station}
            </h4>
          </div>
          <div>
            <h4>
              {train.arrival_time}|{train.train_destination_station}
            </h4>
          </div>
        </div>
        <div className={classes.train_class}>
          {train.class_type.map((coach) => {
            return <button className={classes.coach_container}>{coach}</button>;
          })}
        </div>
        {/* <div className={classes.book}>
          <Button>Book</Button>
        </div> */}
      </div>
    </Fragment>
  );
}
/*
{
      train_number: "12545",
      train_name: "Karmbhoomi Exp",
      run_days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      depart_time: "22:35:00",
      arrival_time: "05:30:00",
      class_type: ["2A", "3A", "SL", "2S"],
      train_origin_station:"Raxaul"
train_origin_station_code:"RXL"
train_destination_station:"Mumbai"
train_destination_station_code:"LTT"
    }
    */
