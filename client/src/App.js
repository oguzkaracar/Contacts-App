import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";

import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import setAuthToken from "./utils/setAuthToken";

import "./App.css";



// token kontrolü..
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

// App ...

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<Fragment>
							<Navbar />
							<div className="container">
								<Alerts />
								<Switch>
									<PrivateRoute exact path="/" component={Home} />
									<Route exact path="/about" component={About} />
									<Route exact path="/register" component={Register} />
									<Route exact path="/login" component={Login} />
									<Route component={NotFound} />
								</Switch>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;