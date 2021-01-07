import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<main style={{ textAlign: 'center', marginTop: '80px', marginBottom: '85px' }}>
			<div className="container">
				<h2>404! Error</h2>
				<h3 className="py-3">Page Not Found</h3>
				<Link to="/">
					<Button className="px-4 py-2 " variant="warning">
						Go to Home Page
					</Button>
				</Link>
			</div>
		</main>
	);
};

export default NotFound;
