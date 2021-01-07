import React, { createContext, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import AvailableHotels from './Components/AvailableHotels/AvailableHotels';
import Booking from './Components/Booking/Booking';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
	const location = useLocation();

	const [ loggedInUser, setLoggedInUser ] = useState({});
	const [ signOutUser, setSignOutUser ] = useState({});

	// State for getting form data
	const [ bookingInfo, setBookingInfo ] = useState({});
	const [ selectedPlace, setSelectedPlace ] = useState({});

	return (
		<UserContext.Provider
			value={{
				bookingInfo,
				setBookingInfo,
				selectedPlace,
				setSelectedPlace,
				loggedInUser,
				setLoggedInUser,
				signOutUser,
				setSignOutUser
			}}
		>
			<div className={`${location.pathname === '/' || location.pathname.includes('booking') ? 'home' : ''}`}>
				<Header />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/booking/:id">
						<Booking />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<PrivateRoute exact path="/availableHotels">
						<AvailableHotels />
					</PrivateRoute>
				</Switch>
			</div>
		</UserContext.Provider>
	);
}

export default App;
