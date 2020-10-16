import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = () => {
	const { isAuthenticated, logout, user } = useContext(AuthContext);
	const {clearContacts} = useContext(ContactContext);

	const onLogout = ()=>{
		logout();
		clearContacts(); // contacts state'ini varsayılan hale getirdik.
	}

	const authLinks = (
		<Fragment>
			<li>Hello {user && user.name} </li>
			<li>
				<a href="#!" onClick={onLogout}>
					<i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
			<li>
				<Link to="/about">About</Link>
			</li>
			
		</Fragment>
	);

	return (
		<div className="navbar bg-primary">
			<h2>
				<i className="fas fa-id-card-alt"></i> Contact Keeper
			</h2>
			<ul>
				{isAuthenticated ? authLinks : guestLinks}
			</ul>
		</div>
	);
};

export default Navbar;
