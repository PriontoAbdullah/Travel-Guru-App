import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { UserContext } from '../../App';
import AllHotel from '../../fakeData/AllHotels';
import MapLocation from '../../fakeData/MapLocations';
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
			const loadedLocation = MapLocation.find((location) => location.id === selectedPlace.id);
			setSelectedLocation(loadedLocation);
		},
		[ selectedPlace.id ]
	);

	// Google map function
	function gMap() {
		return (
			<GoogleMap defaultZoom={12} defaultCenter={{ lat: selectedLocation.lat, lng: selectedLocation.long }}>
				<Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.long }} />
			</GoogleMap>
		);
	}

	const WrappedMap = withScriptjs(withGoogleMap(gMap));

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
								<span className="font-weight-bold">From</span> {bookingInfo.from.toDateString()}{' '}
								<span className="font-weight-bold mr-1">To</span>
								{bookingInfo.to.toDateString()}
							</p>
							{hotels.map((hotel) => <Hotel key={hotel.id} hotel={hotel} />)}
						</div>
					)}
				</Col>

				{/* Google map */}
				<Col md={6} className="mt-5">
					<div className="map-container mt-5">
						<WrappedMap
							googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAVCB41xN2AIQokG5eFXuVkFJO4Ff1FnaQ`}
							loadingElement={<div style={{ height: `702px` }} />}
							containerElement={<div style={{ height: `702px` }} />}
							mapElement={<div style={{ width: '100%', height: '96%', borderRadius: '8px' }} />}
						/>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default AvailableHotels;
