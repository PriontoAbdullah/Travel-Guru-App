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
    <Row className="my-3">
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
        <h5 className="mt-3">{hotelName}</h5>
        <p className="pt-3 text-secondary">
          {guests} guests, {bedrooms} bedrooms, {bed} beds
        </p>
        <p className="pt-2 text-secondary">{facilities}</p>
        <p className="pt-2 text-secondary">{cancellation}</p>
        <div className="d-flex justify-content-between align-items-center pt-2">
          <div className="d-flex  align-items-center">
            <img
              style={{ width: "15%" }}
              src="https://i.imgur.com/e1r9JgH.png"
              alt="rating"
            />
            <span className="pl-2">{ratting}({price+49})</span>
          </div>
          <div>
            <span className="pr-5">${price}/night</span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Hotel;
