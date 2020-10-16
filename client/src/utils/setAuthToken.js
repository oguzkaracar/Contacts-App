import axios from "axios";

const setAuthToken = (token) => {
	if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
        // her requestte header a varolan token' ı ekleyecez. Eğer token yok ise header dan x-auth-token değerini silecez..
	} else {
		delete axios.defaults.headers.common["x-auth-token"]; 
		// delete axios metodu? - burada axios header'dan  x-auth-token siliniyor...
	}
};

export default setAuthToken;

// Burada global headers içindeki token ile ilgili işlemler yaptık..
