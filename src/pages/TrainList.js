import React, { useState, useEffect, Fragment } from "react";
import { useStation } from "../context/StationContext";
import { useAuth } from "../context/AuthContext";
import { useLocation, useLoaderData } from "react-router-dom";
import "./TrainList.css";
import axios from "axios";

import { TextField, Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import LoginNavBar from "../components/Navbar/LoginNavbar";
import Card from "../UI/Card/Card";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button, Nav } from "react-bootstrap";

const data = {
  data: [
    {
      train_number: "12545",
      train_name: "Karmbhoomi Exp",
      run_days: ["S", "M", "T", "W", "Th", "F", "S"],
      depart_time: "22:35:00",
      arrival_time: "05:30:00",
      class_type: ["2A", "3A", "SL", "2S"],
      train_origin_station: "Raxaul",
      train_destination_station: "Mumbai",
    },
    {
      train_number: "13969",
      train_name: "Utsarg",
      run_days: ["M", "T", "W", "Th"],
      depart_time: "18:00:00",
      arrival_time: "07:30:00",
      class_type: ["2A", "3A", "SL"],
      train_origin_station: "Lucknow",
      train_destination_station: "Chhapra",
    },
    {
      train_number: "19546",
      train_name: "Chennai-MGR-Ctrl",
      run_days: ["Fri", "Sat"],
      depart_time: "05:45:00",
      arrival_time: "20:00:00",
      class_type: ["2A", "3A", "SL", "2S"],
      train_origin_station: "Chennai",
      train_destination_station: "Lucknow",
    },
  ],
};
export default function TrainList() {
  const data = useLoaderData();
  const { currentUser } = useAuth();

  //const { fromStation, toStation } = useStation();

  const [train, setTrain] = useState("Utsarg");

  const location = useLocation();
  const fromStation = location.state.fromS;
  const toStation = location.state.toS;

  console.log(location);

  useEffect(() => {
    console.log("IN train list", fromStation);
    console.log("In train list", toStation);
  }, [fromStation, toStation]);

  const dataStoreHandler = async (TrainData) => {
    //event.preventDefault();

    try {
      console.log(currentUser.email);
      const docRef = await addDoc(collection(db, `${currentUser.email}`), {
        TrainName: TrainData.train_name,
        TrainNumber: TrainData.train_number,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div>
      {/* {!currentUser ? <Navbar /> : <LoginNavBar />} */}
      {!currentUser && <Navbar />}
      {currentUser && <LoginNavBar />}

      <div className="train-list">
        <h1>
          Train is running from {fromStation} to {toStation}
        </h1>
        {data.data.map((train) => {
          return (
            <div className="train-container">
              <Box>
                <Card train={train} />
              </Box>
              <div className="btn">
                <Button
                  onClick={() => dataStoreHandler(train)}
                  style={{ backgroundColor: "orange" }}
                >
                  Book
                </Button>
              </div>
            </div>
          );
        })}
        {/* <Card train={data} /> */}
      </div>

      {/*<div className="train-input">
          <form onSubmit={dataStoreHandler}>
            <TextField
              id="outlined-basic"
              label="Type"
              variant="outlined"
              onChange={(event) => {
                setTrain(event.target.value);
              }}
            />
            <Button type="submit">Enter</Button>
          </form>
        </div> */}
    </div>
  );
}

export async function loader() {
  const options = {
    method: "GET",
    url: "https://irctc1.p.rapidapi.com/api/v2/trainBetweenStations",
    params: { fromStationCode: "bju", toStationCode: "bdts" },
    headers: {
      "X-RapidAPI-Key": "f89a1dec92msh2a7baa3bc8a2957p15c76bjsnec69fdaf1b39",
      "X-RapidAPI-Host": "irctc1.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);
  if (!response.ok) {
    return response.data;
  } else {
    console.log(response.status);
  }
}

/*train_number:"12545"
train_name:"Karmbhoomi Exp"
train_type:"M"
run_days:
train_origin_station:"Raxaul"
train_origin_station_code:"RXL"
train_destination_station:"Mumbai"
train_destination_station_code:"LTT"
depart_time:"22:35:00"
arrival_time:"05:30:00"
distance:"1800"
class_type:
day_of_journey:1
 */
