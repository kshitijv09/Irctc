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

const trainData = {
  data: [
    {
      train_number: "12545",
      train_name: "Karmbhoomi Exp",
      run_days: ["S", "M", "T", "W", "Th", "F", "S"],
      from_sta: "22:35:00",
      to_sta: "05:30:00",
      class_type: ["2A", "3A", "SL", "2S"],
      train_src: "Raxaul",
      train_dstn: "Mumbai",
      train_date: "26-05-2023",
      duration: "27:35",
    },
    {
      train_number: "13969",
      train_name: "Utsarg",
      run_days: ["M", "T", "W", "Th"],
      from_sta: "18:00:00",
      to_sta: "07:30:00",
      class_type: ["2A", "3A", "SL"],
      train_src: "Lucknow",
      train_dstn: "Chhapra",
      train_date: "26-05-2023",
      duration: "27:35",
    },
    {
      train_number: "19546",
      train_name: "Chennai-MGR-Ctrl",
      run_days: ["Fri", "Sat"],
      from_sta: "05:45:00",
      to_sta: "20:00:00",
      class_type: ["2A", "3A", "SL", "2S"],
      train_src: "Chennai",
      train_dstn: "Lucknow",
      train_date: "26-05-2023",
      duration: "27:35",
    },
  ],
};

export default function TrainList() {
  /* const data = useLoaderData(); */
  const [trainData, setTrainData] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  //const { fromStation, toStation } = useStation();

  const [train, setTrain] = useState("Utsarg");

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
        /* dateOfJourney: "2023-05-20", */
        dateOfJourney: ` ${date.getFullYear()} -${
          date.getMonth() + 1
        }-${date.getDate()}`,
      },
      headers: {
        "X-RapidAPI-Key": "f89a1dec92msh2a7baa3bc8a2957p15c76bjsnec69fdaf1b39",
        "X-RapidAPI-Host": "irctc1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    console.log(response.status);
    if (!response.ok) {
      console.log(response.data.data);
      setTrainData(response.data);
      //console.log("Data is" + trainData);
    } else {
      console.log(response.status);
    }
  }

  useEffect(() => {
    console.log(fromStation, toStation);
    trainDetails();
  }, []);

  /*  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      setTrainData(response.data);
    })
    .catch(function (error) {
      console.error(error);
    }); */

  const dataStoreHandler = async (TrainData) => {
    //event.preventDefault();

    try {
      //console.log(currentUser.email);
      const docRef = await addDoc(collection(db, `${currentUser.email}`), {
        TrainName: TrainData.train_name,
        TrainNumber: TrainData.train_number,
      });
      //console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      {/* {!currentUser ? <Navbar /> : <LoginNavBar />} */}
      {!currentUser && <Navbar />}
      {currentUser && <LoginNavBar />}
      {/* {loading && <TDetails trainData={trainData} />} */}
      {
        <div className="train-list">
          {/* <h1>
            Train is running from {fromStation} to {toStation}
          </h1> */}

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

/* export async function Loader() {
  const location = useLocation();
  const fromStation = location.state.fromS;
  const toStation = location.state.toS;

  const options = {
    method: "GET",
    url: "https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations",
    params: {
      fromStationCode: `${fromStation}`,
      toStationCode: `${toStation}`,
      dateOfJourney: "2023-05-20",
    },
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
} */

/*train_number:"22221"
train_name:"MUMBAI CSMT - HAZRAT NIZAMUDDIN Rajdhani Express"
run_days:
train_src:"CSMT"
train_dstn:"NZM"
from_std:"16:00"
from_sta:"16:00"
local_train_from_sta:960
to_sta:"09:55"
to_std:"09:55"
from_day:0
to_day:1
d_day:0
from:"CSMT"
to:"NZM"
from_station_name:"MUMBAI CSMT"
to_station_name:"DELHI HAZRAT NIZAMUDDIN"
duration:"17:55"
special_train:false
train_type:"RAJ"
train_date:"26-05-2023"
class_type:
*/
