  
import React from "react";
import { Link } from "react-router-dom";
import './Login.css';

const LoginForm = (props) => {
	const { toggleUser, validation, submit, errors } = props;

	return (
		<div className="tg-form login">
			<h3>Login</h3>

			<form onSubmit={submit}>
				<div className="form-group">
					<input type="email" className="form-control" placeholder="Email" name="email" onBlur={validation} />
					{errors.email.length > 0 && <p className="error-msg">{errors.email}</p>}
				</div>

				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="Password"
						name="password"
						onBlur={validation}
					/>
					{errors.password.length > 0 && <p className="error-msg">{errors.password}</p>}
				</div>

				<div className=" form-group forgot-pass">
					<div className="custom-control custom-checkbox mr-sm-2">
						<input type="checkbox" className="custom-control-input" id="rememberUser" />
						<label className="custom-control-label" htmlFor="rememberUser">
							Remember me
						</label>
					</div>
					<Link to="/" className="forgot-passowrd">
						Forgot Password
					</Link>
				</div>

				<button type="submit" className="btn btn-warning tg-primary btn-block">
					Login
				</button>
			</form>

			<div className="register-login">
				Don’t have an account?
				<button className="btn btn-logintoggle" onClick={toggleUser}>
					Create an account
				</button>
			</div>
		</div>
	);
};

export default LoginForm;