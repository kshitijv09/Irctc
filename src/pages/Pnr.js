import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/Navbar/Navbar";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Pnr() {
  const [num, enterNum] = useState("");
  const [PNR, setPNR] = useState("8531575878");
  const [details, setPNRdetails] = useState("");

  const [loading, setLoading] = useState(false);
  //8531575878
  const pnrHandler = (event) => {
    enterNum(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setPNR(num);
    setLoading(true);
  };
  async function PNRenquiry() {
    const options = {
      method: "GET",
      url: `https://pnr-status-indian-railway.p.rapidapi.com/pnr-check/${PNR}`,
      headers: {
        "X-RapidAPI-Key": "f89a1dec92msh2a7baa3bc8a2957p15c76bjsnec69fdaf1b39",
        "X-RapidAPI-Host": "pnr-status-indian-railway.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    if (!response.ok) {
      setPNRdetails(response.data);
      //return response.data;
    } else {
      console.log(response.status);
    }
  }
  useEffect(() => {
    PNRenquiry();
  }, [PNR]);
  return (
    <div>
      <ResponsiveAppBar />
      <form onSubmit={submitHandler} className="input">
        <TextField
          className="input"
          size="small"
          label="Location"
          variant="filled"
          color="success"
          focused
          onChange={pnrHandler}
          value={num}
          inputProps={{
            style: {
              height: "20px",
            },
          }}
          InputLabelProps={{
            style: { fontSize: "1.2rem", fontWeight: "1000" },
          }}
        />
        <Button
          type="submit"
          variant="outlined"
          style={{ padding: "10px" }}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </form>
      loading &&
      <div /* className={classes.container} */>
        <h1>
          PNR status:{details.status},{details.code},{details.message},
          {details.message}
        </h1>
      </div>
    </div>
  );
}

export async function loader() {
  const options = {
    method: "GET",
    url: "https://pnr-status-indian-railway.p.rapidapi.com/pnr-check/8531575878",
    headers: {
      "X-RapidAPI-Key": "f89a1dec92msh2a7baa3bc8a2957p15c76bjsnec69fdaf1b39",
      "X-RapidAPI-Host": "pnr-status-indian-railway.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);
  if (!response.ok) {
    return response.data;
  } else {
    console.log(response.status);
  }
}
