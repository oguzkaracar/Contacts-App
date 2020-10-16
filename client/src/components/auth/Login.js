import React, { useState, useContext, useEffect }  from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

function Login(props) {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const { email, password } = user;

	const {setAlert} = useContext(AlertContext);
	const { error, login, clearErrors, isAuthenticated } = useContext(AuthContext);

	useEffect(() => {

		if(isAuthenticated){
			props.history.push('/');
		}

		if (error === "Invalid Credentials.") {
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
		if (password === "" || email === "") {
			setAlert("Please enter all fields", "danger");
		}else{
			login({email,password})
		}
		
	};

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Login</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input type="email" name="email" value={email} onChange={onChange} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" value={password} onChange={onChange} />
				</div>
				<input type="submit" value="Login" className="btn btn-success btn-block" />
			</form>
		</div>
	);
}

export default Login;
