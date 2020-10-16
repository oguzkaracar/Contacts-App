import React, { useContext, useEffect, useRef } from "react";
import ContactContext from "../../context/contact/contactContext";

function ContactFilter() {
	const { filtered, clearFilter, filterContacts } = useContext(ContactContext);

    // react ref ile DOM elemanlarına ya da render edilen component elemanlarına müdahale etmemizi sağlar. Formlar üzerinde kullanabiliriz. özellikle tek input içeren kısımlarda focus işlemleri arama-search işlemleri gibi durumlarda kullanılır.. 
    // ==> https://aligoren.com/react-hooks-ve-useref-kullanimi/  
	const text = useRef();

	useEffect(() => {
		if (filtered === null) {
			text.current.value = "";
		}
	});

	const onChange = (e) => {
		if (text.current.value !== "") {
			filterContacts(e.target.value);
		} else {
			clearFilter();
		}
	};

	return (
		<form>
			<input type="text" ref={text} placeholder="Filter Contacts" onChange={onChange} />
		</form>
	);
}

export default ContactFilter;
