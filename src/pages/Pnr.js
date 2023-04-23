import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/Navbar/Navbar";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PnrDetails from "../components/PnrDetails/PnrDetails";
import "./Pnr.css";

export default function Pnr() {
  const [num, enterNum] = useState("");
  const [PNR, setPNR] = useState("4147107547");
  const [details, setPNRdetails] = useState(null);

  const [loading, setLoading] = useState(false);
  const pnrHandler = (event) => {
    enterNum(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setPNR(num);
    console.log(num);
    console.log(PNR);
    setLoading(true);
  };
  async function PNRenquiry() {
    console.log("PNR no is" + PNR);
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
      <form onSubmit={submitHandler} className="input-container">
        <TextField
          className="input"
          size="large"
          label="PNR"
          variant="outlined"
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
      {loading && <PnrDetails details={details} />}
    </div>
  );
}
