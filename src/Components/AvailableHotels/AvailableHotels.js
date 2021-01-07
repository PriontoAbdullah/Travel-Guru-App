import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../App';
import AllHotel from '../../fakeData/AllHotels';
import AllLocation from '../../fakeData/AllLocation';
import Hotel from '../Hotel/Hotel';
import './AvailableHotels.css';

const AvailableHotels = () => {
	// Receiving data from context
	const { selectedPlace, bookingInfo } = useContext(UserContext);

	// State for storing all hotels information
	const [ hotels, setHotels ] = useState([]);

	// State for storing location information
	const [ selectedLocation, setSelectedLocation ] = useState({
		id: '',
		lat: '',
		long: ''
	});

	// Loading all hotels information
	useEffect(
		() => {
			const loadedHotels = AllHotel.filter((hotel) => hotel.placeId === selectedPlace.id);
			setHotels(loadedHotels);
		},
		[ selectedPlace.id ]
	);

	// Loading location information of selected
	useEffect(
		() => {
			const loadedLocation = AllLocation.find((location) => location.id === selectedPlace.id);
			setSelectedLocation(loadedLocation);
		},
		[ selectedPlace.id ]
	);

	return (
		<Container>
			<Row>
				{/* Available hotel information */}
				<Col md={6} className="mt-5">
					{!hotels.length ? (
						<h3>No hotels are free</h3>
					) : (
						<div className="mb-5">
							<h4>Stay in {selectedPlace.name}</h4>
							<p>
								<span className="font-weight-bold">From</span> {bookingInfo.from.toDateString()} <span className="font-weight-bold mr-1">To</span> 
								{bookingInfo.to.toDateString()}
							</p>
							{hotels.map((hotel) => <Hotel key={hotel.id} hotel={hotel} />)}
						</div>
					)}
				</Col>

				{/* Google map */}
				<Col md={6}>
					<div className="map-container">
						<h2>Map Hare...</h2>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default AvailableHotels;
