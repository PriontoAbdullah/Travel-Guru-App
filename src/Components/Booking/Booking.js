import { addDays } from 'date-fns';
import React, { useContext, useEffect } from 'react';
import { Card, Col, Container, Jumbotron, Row } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
// importing datepicker css
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import locations from '../../fakeData/AllLocation';
import './Booking.css';

const Booking = () => {
	const { id } = useParams();
	const { setBookingInfo, selectedPlace, setSelectedPlace } = useContext(UserContext);

	const history = useHistory();

	// hooks for react-hooks-form
	const { register, handleSubmit, errors, control, getValues } = useForm({});

	// finding selected place
	useEffect(
		() => {
			const bookingLocation = locations.find((location) => location.id.toString() === id);
			setSelectedPlace(bookingLocation);
		},
		[ id, setSelectedPlace ]
	);

	// submitted booking data
	const onSubmit = (data) => {
		setBookingInfo(data);
		history.push('/availableHotels');
	};

	return (
		<Container className="mt-5 pt-5">
			<Row>
				<Col sm={6} xl={6}>
					<Jumbotron className="bg-transparent px-0">
						<h1 className="font-weight-bold">{selectedPlace.name}</h1>
						<p>{selectedPlace.description}</p>
					</Jumbotron>
				</Col>
				<Col xl={1} />
				<Col sm={6} xl={5}>
					<Card>
						<Card.Body>
							<div className="booking-form-container m-auto">
								<form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
									<label>Origin</label>
									<input
										className="form-control mb-3"
										placeholder="Origin"
										defaultValue="Dhaka"
										name="origin"
										ref={register({ required: 'Origin required' })}
									/>
									{errors.origin && <span className="error">{errors.origin.message}</span>}

									<label>Destination</label>
									<input
										className="form-control mb-3"
										placeholder="Destination"
										readOnly
										defaultValue={selectedPlace.name}
										name="destination"
										ref={register({ required: 'Destination required' })}
									/>
									{errors.destination && <span className="error">{errors.destination.message}</span>}

									{/* React detepickers */}
									<div className="date-input-container">
										<div style={{ float: 'left', width: '45%' }}>
											<Controller
												control={control}
												defaultValue=""
												name="from"
												rules={{
													required: {
														value: true,
														message: 'From required'
													}
												}}
												render={(props) => (
													<ReactDatePicker
														className="form-control mb-2"
														placeholderText="From"
														minDate={new Date()}
														maxDate={addDays(new Date(), 7)}
														dateFormat="dd/MM/yyyy"
														onChange={(e) => props.onChange(e)}
														selected={props.value}
													/>
												)}
											/>
											{errors.from && <span className="error">{errors.from.message}</span>}
										</div>
										<div
											style={{
												float: 'right',
												width: '45%',
												marginBottom: '20px'
											}}
										>
											<Controller
												control={control}
												defaultValue=""
												name="to"
												rules={{
													required: {
														value: true,
														message: 'To required'
													},
													validate: () =>
														getValues('from') < getValues('to') ||
														'To must be less then from.'
												}}
												render={(props) => (
													<ReactDatePicker
														className="form-control mb-2"
														placeholderText="To"
														minDate={new Date()}
														maxDate={addDays(new Date(), 14)}
														dateFormat="dd/MM/yyyy"
														onChange={(e) => props.onChange(e)}
														selected={props.value}
													/>
												)}
											/>
											{errors.to && <span className="error">{errors.to.message}</span>}
										</div>
									</div>

									<input
										type="hidden"
										defaultValue={selectedPlace.id}
										className="form-control mb-4 "
										ref={register({ required: true })}
										name="id"
									/>

									<input
										type="submit"
										value="Start Booking"
										className="form-control mb-4 "
										style={{ backgroundColor: '#ffc107', color: '#202020' }}
									/>
								</form>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Booking;
