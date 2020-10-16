const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId, // user collectionı ile aralarında bir bağ kurduk. user id si ile burada bazı işlemler yapıcaz..
		ref: "users", // users ==> collection name... reference alıcağı collection users collectionı onu belirttik...
	},

	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	type: {
		type: String,
		default: "personal",
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// User modeli oluşturuldu...
module.exports = mongoose.model("Contact", ContactSchema);
