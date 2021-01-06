import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';

function App() {
	return (
		<div className="home">
			<Router>
      <Header />
				<Switch>
					<Route path="/">
					
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
