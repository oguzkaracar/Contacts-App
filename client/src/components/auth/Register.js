import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

function Register(props) {
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	// Component level state destructuring...
	const { name, email, password, password2 } = user;

	// AlertContext destructuring
	const { setAlert } = useContext(AlertContext);
	//AuthContext destructuring
	const { error, register, clearErrors, isAuthenticated } = useContext(AuthContext);

	useEffect(() => {

		if(isAuthenticated){
			props.history.push('/');
		}

		if (error === "User already exists...") {
			setAlert(error, "danger", 4000);
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error,isAuthenticated,props.history]);

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// validations and submit işlemleri..
		if (name === "" || password === "" || email === "" || password2 === "") {
			setAlert("Please enter all fields", "danger");
		} else if (password !== password2) {
			setAlert("Passwords does not equal", "danger");
		} else {
			register({ name, email, password });
			setUser({
				name: "",
				email: "",
				password: "",
				password2: "",
			});
		}
	};

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" value={name} onChange={onChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" value={email} onChange={onChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirm Password</label>
					<input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />
				</div>
				<input type="submit" value="Register" className="btn btn-primary btn-block" />
			</form>
		</div>
	);
}

export default Register;
