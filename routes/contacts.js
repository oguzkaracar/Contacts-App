const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Contact = require("../models/Contact");
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

// @route    Get api/contacts
// @desc     get All users contacts
// @access   Private
router.get("/", auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
		res.json(contacts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

// @route    Post api/contacts
// @desc     Add users contacts
// @access   Private
router.post(
	"/",
	[
		auth,
		[
			body("email", "Please include a valid email").isEmail(),
			body("email", "Email is required").exists(),
			body("name", "Name is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, name, phone, type } = req.body;

		try {
			const newContact = new Contact({ user: req.user.id, name, email, phone, type });
			const contact = await newContact.save();
			res.json(contact);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

// @route    PUT api/contacts/:id
// @desc     Add users contacts
// @access   Private
router.put("/:id", auth, async (req, res) => {
	try {
        let contact = await Contact.findById(req.params.id);
        
		if (!contact) res.status(404).json({ msg: "Contact Not Found" });

		// Make sure user own contact update.
		if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: "Not Authorized" });

        // update contact işlemi...
		contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

		// güncellenen contact datasını gönder..
		res.json(contact);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("server error");
	}
});

// @route    DELETE api/contacts/:id
// @desc     Add users contacts
// @access   Private
router.delete("/:id", auth, async (req, res) => {
	try {
		await Contact.findByIdAndRemove(req.params.id);
		res.json({msg:'Contact removed..'});
	} catch (error) {
		console.error(error.message);
		res.status(500).send("server error");
	}
});

module.exports = router;
