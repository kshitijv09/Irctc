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

export default function TrainList() {
  const [trainData, setTrainData] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  const location = useLocation();
  const fromStation = location.state.fromS;
  const toStation = location.state.toS;
  const date = location.state.date;

  console.log("Date is" + date);
  console.log(
    date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate()
  );

  async function trainDetails() {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations",
      params: {
        fromStationCode: `${fromStation}`,
        toStationCode: `${toStation}`,
        dateOfJourney: ` ${date.getFullYear()} -${
          date.getMonth() + 1
        }-${date.getDate()}`,
      },
      headers: {
        "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
        "X-RapidAPI-Host": "irctc1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);

    if (!response.ok) {
      setTrainData(response.data);
    } else {
      setError(true);
      console.log(response.status);
    }
  }

  useEffect(() => {
    trainDetails();
  }, []);

  const dataStoreHandler = async (TrainData) => {
    try {
      const docRef = await addDoc(collection(db, `${currentUser.email}`), {
        train_name: TrainData.train_name,
        train_number: TrainData.train_number,
        run_days: TrainData.run_days,
        from_sta: TrainData.from_sta,
        train_src: TrainData.train_src,
        train_date: TrainData.train_date,
        duration: TrainData.duration,
        to_sta: TrainData.to_sta,
        train_dstn: TrainData.train_dstn,
        class_type: TrainData.class_type,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  if (trainData.data.length == 0) {
    return (
      <div>
        {!currentUser && <Navbar />}
        {currentUser && <LoginNavBar />}
        <div className="no-train blink">
          <h1>
            No trains run between {fromStation} and {toStation} !
          </h1>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {!currentUser && <Navbar />}
        {currentUser && <LoginNavBar />}
        {
          <div className="train-list">
            {trainData.data.map((train) => {
              return (
                <div className="train-container">
                  <Box>
                    <Card train={train} />
                  </Box>
                  <div className="btn">
                    <Button
                      onClick={() => {
                        dataStoreHandler(train);
                        alert(
                          "Your reservation has been made. You can check reservation details in Account Section"
                        );
                      }}
                      style={{ backgroundColor: "orange" }}
                      disabled={!currentUser}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>
    );
  }
}
