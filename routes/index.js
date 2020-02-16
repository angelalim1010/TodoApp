const express = require("express");
const router = express.Router();


router.get("/", async (req, res, next) => {
	try {
		let currentUser =
			req.signedCookies.user !== undefined
				? req.signedCookies.user
				: "Please log into a user";
        res.render("index", { title: currentUser });
	} catch (err) {
		console.log(err);
	}
});

router.get("/login", async (req, res, next) => {
	try {
		res.render("login");
	} catch (err) {
		console.log(err);
	}
});

router.get("/signup", async (req, res, next) => {
	try {
		res.render("signup");
	} catch (err) {
		console.log(err);
	}
});

router.get("/todos", async (req, res, next) => {
	try {
		res.render("todo");
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
