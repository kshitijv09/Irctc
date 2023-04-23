import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Datepicker(props) {
  const [startDate, setStartDate] = useState(new Date());
  const dateChangeHandler = (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    console.log(startDate);
    props.newDate(startDate);
  }, [startDate]);

  return (
    <div style={{ border: "black solid 4px", borderRadius: "3px" }}>
      <DatePicker
        closeOnScroll={true}
        showIcon={true}
        selected={startDate}
        onChange={dateChangeHandler}
      />
    </div>
  );
}
