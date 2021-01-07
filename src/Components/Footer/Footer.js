import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
	return (
		<footer className="bg-color py-3">
			<div className="container">
				<div className="row footer-top pt-5 pb-3">
					<div className="col-md-3 mb-5">
						<img
							src="https://i.ibb.co/FHBKmhh/travel-logo.png"
							alt="white-logo"
							className="logo"
							width="150"
							height="80"
						/>
                        <h4 className="mt-4 text-white">Travel Guru App</h4>
					</div>
					<div className="col-md-3">
						<ul className="list-unstyled">
							<li>
								<Link to="/about">About Hotel Booking</Link>
							</li>
							<li>
								<Link to="/blog">Read Our Blog</Link>
							</li>
							<li>
								<Link to="/signup">Sign up to discount</Link>
							</li>
							<li>
								<Link to="/restaurants">Add your hotels</Link>
							</li>
						</ul>
					</div>
					<div className="col-md-3">
						<ul className="list-unstyled">
							<li>
								<Link to="/policy">Privacy Policy</Link>
							</li>
							<li>
								<Link to="/terms">Terms of Use</Link>
							</li>
							<li>
								<Link to="/pricing">Pricing</Link>
							</li>
							<li>
								<Link to="/join">Join with Us</Link>
							</li>
						</ul>
					</div>
					<div className="col-md-3">
						<ul className="list-unstyled">
							<li>
								<Link to="/help">Get Help</Link>
							</li>
							<li>
								<Link to="/faq">Read FAQ</Link>
							</li>
							<li>
								<Link to="/cities">View All Cities</Link>
							</li>
							<li>
								<Link to="/restaurants">Hotels near me</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="footer-bottom d-flex justify-content-center">
					<small className="text-secondary">
						Copyright &copy; 2021 Travel Guru App. Proudly created by <span>❤️</span>
						<span>
							<a className="text-color" href="https://github.com/PriontoAbdullah">
								{' '}
								Prionto Abdullah
							</a>
						</span>
					</small>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
