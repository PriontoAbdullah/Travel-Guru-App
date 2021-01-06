import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Hotel.css";

const Hotel = (props) => {
  const {
    hotelName,
    guests,
    bedrooms,
    bed,
    cancellation,
    facilities,
    ratting,
    photoUrl,
    price
  } = props.hotel;

  return (
    <Row>
      {/* Hotel image column */}
      <Col md={6} className="mb-2">
        <img
          style={{ borderRadius: "10px" }}
          className="hotel-img"
          src={photoUrl}
          alt=""
        />
      </Col>

      {/* Hotel information column */}
      <Col className="hotel-info" md={6}>
        <h6>{hotelName}</h6>
        <br />
        <p>
          {guests} guests {bedrooms} bedrooms {bed} beds
        </p>
        <p>{facilities}</p>
        <p>{cancellation}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-around align-items-center">
            <img
              style={{ width: "15%" }}
              src="https://i.imgur.com/e1r9JgH.png"
              alt=""
            />
            <span>{ratting}({price+49})</span>
          </div>
          <div>
            <span>${price}/night</span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Hotel;
