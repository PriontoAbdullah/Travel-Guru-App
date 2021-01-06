import firebase from 'firebase/app';
import "firebase/auth";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import firebaseConfig from "./firebase.config";
import "./Login.css";
import LoginForm from "./LoginForm";
import OthersLogin from "./OthersLogin";
import SignUpForm from "./SignUpForm";
 
const Login = () => {
	const [newUser, setNewUser] = useState(false);
	const {loggedInUser, setLoggedInUser} = useContext(UserContext);

	const [currentUser, setCurrentUser] = useState({
		isSignedIn: false,
		email: "",
		password: "",
		error: "",
		success: false,
	});

	const history = useHistory();
	const location = useLocation();
	const { from } = location.state || { from: { pathname: "/" } };

	const handleFormToggle = () => {
		setNewUser(!newUser);
	};

	// Initialize Firebase
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}

	// GOOGLE Sign in 
	const handleGoogleSignIn = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function(result) {
				const { displayName, email } = result.user;
				const newUser = {
					isSignedIn: true,
					email: email,
					name: displayName,
				};
				setCurrentUser(newUser);

				setLoggedInUser(newUser);
				history.replace(from);
				console.log(newUser);
			})
			.catch(function(error) {
				const newUser = { ...currentUser };
				newUser.error = error.message;
				newUser.success = false;
				setLoggedInUser(newUser);
				console.log(error);
			});
	};

	// FACEBOOK Sign in 
	const handleFacebookSignIn = () => {
		const provider = new firebase.auth.FacebookAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function(result) {
				const { displayName, email } = result.user;
				const newUser = {
					isSignedIn: true,
					email: email,
					name: displayName,
				};
				setCurrentUser(newUser);

				setLoggedInUser(newUser);
				history.replace(from);
				console.log(newUser);
			})
			.catch(function(error) {
				const newUser = { ...currentUser };
				newUser.error = error.message;
				newUser.success = false;
				setLoggedInUser(newUser);
				console.log(error);
			});
	};

	// Form validation and give error 
	const [errors, setErrors] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	let pass1, pass2;
	const handleFormValidation = (e) => {
		let isFieldValid = true;
		const newError = { ...errors };

		if (e.target.name === "name") {
			isFieldValid = e.target.value.length > 2;
			if (!isFieldValid) {
				newError[e.target.name] = "Name is not valid";
				setErrors(newError);
			} else {
				newError[e.target.name] = "";
				setErrors(newError);
			}
		}

		if (e.target.name === "email") {
			isFieldValid = /\S+@\S+/.test(e.target.value);
			if (!isFieldValid) {
				newError[e.target.name] = "Email is not valid";
				setErrors(newError);
			} else {
				newError[e.target.name] = "";
				setErrors(newError);
			}
		}

		if (e.target.name === "password" || e.target.name === "confirmPassword") {
			const isPasswordLengthValid = e.target.value.length > 5;
			const passwordHasNumber = /\d{1}/.test(e.target.value);

			isFieldValid = isPasswordLengthValid && passwordHasNumber;

			if (e.target.name === "password") {
				pass1 = e.target.value;
				if (!isFieldValid) {
					newError[e.target.name] = "Password is not valid";
					setErrors(newError);
				} else {
					newError[e.target.name] = "";
					setErrors(newError);
				}
			}
			if (e.target.name === "confirmPassword") {
				pass2 = e.target.value;
				if (!isFieldValid && pass1 !== pass2) {
					newError[e.target.name] = "Password is not matched";
					setErrors(newError);
				} else {
					newError[e.target.name] = "";
					setErrors(newError);
				}
			}
		}

		if (isFieldValid) {
			const newUser = { ...currentUser };
			newUser[e.target.name] = e.target.value;
			setCurrentUser(newUser);
		}
	};

	// CREATE NEW USER 
	const handleCreateNewUser = (e) => {
		e.preventDefault();
		if (!currentUser.email && !currentUser.password) {
			const newError = { ...errors };
			newError.name = "Please use valid Name!";
			newError.email = "Please use valid Email!";
			newError.password = "Please use valid Password!";
			newError.confirmPassword = "Please is not matched!";
			setErrors(newError);
		} else {
			firebase
				.auth()
				.createUserWithEmailAndPassword(currentUser.email, currentUser.password)
				.then((result) => {
					const { displayName, email } = result.user;
					const newUser = {
						isSignedIn: true,
						email: email,
						name: displayName,
						success: true,
						error: "",
					};
					setCurrentUser(newUser);

					setLoggedInUser(newUser);
					console.log(result.user);
					history.replace(from);
				})
				.catch((error) => {
					const newUser = { ...currentUser };
					newUser.error = error.message;
					newUser.success = false;
					setLoggedInUser(newUser);
					console.log(error.message);
				});
		}
	};

	// SIGN IN with email and password 
	const handleSignIn = (e) => {
		e.preventDefault();
		if (!currentUser.email && !currentUser.password) {
			const newError = { ...errors };
			newError.email = "Please use valid email!";
			newError.password = "Please use valid password!";
			setErrors(newError);
		} else {
			firebase
				.auth()
				.signInWithEmailAndPassword(currentUser.email, currentUser.password)
				.then((result) => {
					const { displayName, email } = result.user;
					const newUser = {
						isSignedIn: true,
						email: email,
						name: displayName,
						success: true,
						error: "",
					};
					setCurrentUser(newUser);

					setLoggedInUser(newUser);
					history.replace(from);
				})
				.catch((error) => {
					const newUser = { ...currentUser };
					newUser.error = error.message;
					newUser.success = false;
					setLoggedInUser(newUser);
				});
		}
	};

	return (
		<section className="tg-signup-login text-center">
			<div className="container">
				{currentUser.success && (
					<div className="alert alert-success" role="alert">
						User {!newUser ? "logged in" : "registered"} successfully
					</div>
				)}
				{loggedInUser.error && (
					<div className="alert alert-danger" role="alert">
						{loggedInUser.error}
					</div>
				)}
				{newUser ? (
					<SignUpForm
						toggleUser={handleFormToggle}
						validation={handleFormValidation}
						submit={handleCreateNewUser}
						errors={errors}
					></SignUpForm>
				) : (
					<LoginForm
						toggleUser={handleFormToggle}
						validation={handleFormValidation}
						submit={handleSignIn}
						errors={errors}
					></LoginForm>
				)}
				<OthersLogin google={handleGoogleSignIn} facebook={handleFacebookSignIn}></OthersLogin>
			</div>
		</section>
	);
};

export default Login;