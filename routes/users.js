const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route   POST api/users
//@desc     Register a user
// @access  Public
router.post(
	"/",
	[
		// express validator kullanımı...
		body("name", "Please add name").not().isEmpty(),
		body("email", "Please include a valid email").isEmail(),
		body("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: "User already exists..." });
			}
			// collection a eklenecek dosyayının instance'ı
			user = new User({ name, email, password });

			// password hash işlemi..
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			// document save işlemi..
			await user.save();

			// JWT işlemleri
			const payload = {
				user: {
					// gönderilecek veri (payload)
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("server errror");
		}
	}
);

module.exports = router;
