import React, { useContext, useEffect, useState } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
	const { contacs, addContact, current, updateContact, clearCurrent } = useContext(ContactContext);

	// formdaki verileri tek bir state üzerinde obje olarak tutacağız... Component level state- formlarda sık sık kullan!
	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		type: "personal",
	});

	// EDIT Contact with form again.
	// Component render edilirken, Contact listteki edit ile gelen current state objesini - component contact stateine aktarma yapıcak.
	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: "",
				email: "",
				phone: "",
				type: "personal",
			});
		}
	}, [contacs, current]);

	// contact state objesini destruct ettik.
	const { name, email, phone, type } = contact;

	const handleOnChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
		// contact state'ine hangi form input'u değişti ise onun değerini al şeklinde yaptık..
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (current !== null) {
			updateContact(contact);
		} else {
			if (contact.name !== "" && contact.email !== "" && contact.phone !== "") {
				addContact(contact);
			}
		}
		clearAll();
	};

    // form inputlarını ve current objesini sıfırladık.
	const clearAll = () => {
		clearCurrent();
		setContact({
			name: "",
			email: "",
			phone: "",
			type: "personal",
		});
	};
	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary"> {current ? "Update Contact" : "Add Contact"} </h2>
			<input type="text" name="name" value={name} placeholder="Name" onChange={handleOnChange} />
			<input type="email" name="email" value={email} placeholder="Email" onChange={handleOnChange} />
			<input type="tel" name="phone" value={phone} placeholder="Phone Number" onChange={handleOnChange} />

			<h5>Contact Type</h5>
			<label htmlFor="personal">
				<input
					type="radio"
					name="type"
					id="personal"
					value="personal"
					checked={type === "personal"}
					onChange={handleOnChange}
				/>
				<span> Personal</span>
			</label>

			<label htmlFor="professional" style={{marginLeft:'10px'}}>
				<input
					type="radio"
					name="type"
					id="professional"
					value="professional"
					checked={type === "professional"}
					onChange={handleOnChange}
				/>
				<span> Professional</span>
			</label>
			<div>
				<input
					type="submit"
					value={current ? "Update Contact" : "Add Contact"}
					className="btn btn-primary btn-block"
				/>
			</div>
			{current && (
				<div>
					<button className="btn btn-light btn-block" onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
