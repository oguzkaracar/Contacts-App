import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
	CLEAR_CONTACTS,
	GET_CONTACTS,
} from "../types";

const contactReducer = (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload,
				loading: false,
			};
		case ADD_CONTACT:
			return {
				...state,
				contacts: [ action.payload, ...state.contacts], //backend'de sıralama en son eklenen önde diye...
				loading: false,
				// state i direkt olarak değiştiremeyiz. state mutable olduğu için ===> mutable immutable araştır..
				// ==> https://gomakethings.com/mutable-vs.-immutable-in-javascript/
				// ==> https://www.digitalocean.com/community/tutorials/js-mutability
			};
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map((contact) => (contact._id === action.payload._id ? action.payload : contact)),
				loading: false,
				// contacts arrayini döndürecek ve actiondan gelen id ile aynı olan contact objesini değiştirecek. aynı olmayanları ise array' e aynı şekilde ekleyecek...
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter((contact) => contact._id !== action.payload),
				// actiondan gelen id hariç diğer elemanları içeren yeni bir array döndürüyoruz..
			};
		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: null,
				filtered:null,
				error:null,
				current:null
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			};
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, "gi");
					return contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex);
				}),
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};

		case CONTACT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default contactReducer;
