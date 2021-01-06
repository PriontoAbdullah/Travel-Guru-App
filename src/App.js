import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Booking from './Components/Booking/Booking';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';

export const UserContext = createContext();

function App() {



  // State for getting form data
  const [bookingInfo, setBookingInfo] = useState({});

console.log(bookingInfo);

	return (
    <UserContext.Provider value={{  bookingInfo, setBookingInfo }}>
  	<div className= "home">
			<Router>
      <Header />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
          <Route exact path="/booking/:id" >
            <Booking />
          </Route>
				</Switch>
			</Router>
		</div>
    </UserContext.Provider>
	);
}

export default App;
