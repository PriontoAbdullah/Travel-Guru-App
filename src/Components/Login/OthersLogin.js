import React from "react";
import fbLogo from '../../images/icon/fb.png';
import googleLogo from '../../images/icon/google.png';
import './Login.css';

const LoginWithOthers = (props) => {
	return (
		<div>
			<div className="form-divider text-center">
				<p>Or</p>
			</div>

			<div className="tg-thirdparty-login">
				<button className="btn btn-secondary" onClick={props.facebook}>
					<span>
						<img src={fbLogo} style={{ maxWidth: "35px" }} alt="fb logo" />
					</span>
					<span>Continue with Facebook</span>
				</button>
				<button className="btn btn-secondary" onClick={props.google}>
					<span>
						<img src={googleLogo} style={{ maxWidth: "32px" }} alt="fb logo" />
					</span>
					<span>Continue with Google</span>
				</button>
			</div>
		</div>
	);
};

export default LoginWithOthers;