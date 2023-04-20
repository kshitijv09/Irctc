import React from "react";
import "./PnrDetails.css";
export default function PnrDetails({ details }) {
  return (
    <div className="container">
      <div className="heading">
        <h1> Passenger Current Status Enquiry</h1>
      </div>
      <div className="info-container">
        <div className="train-info">
          <div className="grp" style={{ width: "22%" }}>
            <div className="head">Train No.</div>
            <div className="body">{details.data.trainInfo.trainNo}</div>
          </div>
          <div className="grp" style={{ width: "22%" }}>
            <div className="head">Train Name</div>
            <div className="body">{details.data.trainInfo.name}</div>
          </div>
          <div className="grp" style={{ width: "22%" }}>
            <div className="head"> Boarding Date</div>
            <div className="body">{details.data.trainInfo.dt}</div>
          </div>
          <div className="grp" style={{ width: "11%" }}>
            <div className="head">From</div>
            <div className="body">{details.data.trainInfo.boarding}</div>
          </div>
          <div className="grp" style={{ width: "11%" }}>
            <div className="head">To</div>
            <div className="body">{details.data.trainInfo.destination}</div>
          </div>
          <div className="grp" style={{ width: "12%" }}>
            <div className="head">Class</div>
            <div className="body">
              {details.data.passengerInfo[0].currentCoach}
            </div>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="passenger-group">
          <div className="passenger-heading">
            <div className="passenger-head" style={{ width: "33%" }}>
              Sl.No.
            </div>
            <div className="passenger-head" style={{ width: "33%" }}>
              Coach Number
            </div>
            <div className="passenger-head" style={{ width: "34%" }}>
              Berth Number
            </div>
          </div>

          <div className="passenger-container">
            {details.data.passengerInfo.map((pas, key) => {
              return (
                <div className="passenger-info">
                  <div className="passenger-detail" style={{ width: "33%" }}>
                    {key}{" "}
                  </div>

                  <div className="passenger-detail" style={{ width: "33%" }}>
                    {pas.currentCoach}
                  </div>

                  <div className="passenger-detail" style={{ width: "34%" }}>
                    {pas.currentBerthNo}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
