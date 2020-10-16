import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";


// !!! Genel olarak privateRoutelar bu şekilde yapılıyor. Mantığını kavra...
const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated, loading } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => (!isAuthenticated && !loading ? <Redirect to="/login" /> : <Component {...props} />)}
		/>
	);
};

export default PrivateRoute;
