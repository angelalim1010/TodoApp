const express = require("express");
const router = express.Router();


/* GET home page. */
router.get("/", async (req, res, next) => {
	try {
		let currUser =
			req.signedCookies.user !== undefined
				? req.signedCookies.user
				: "Not Logged In";
		res.render("index", { title: currUser });
	} catch (err) {
		console.log(err);
	}
});

// gets user form for login
router.get("/login", async (req, res, next) => {
	try {
		res.render("login");
	} catch (err) {
		console.log(err);
	}
});

// gets user form for signup
router.get("/signup", async (req, res, next) => {
	try {
		res.render("signup");
	} catch (err) {
		console.log(err);
	}
});

// router.get("/todos", async (req, res, next) => {
// 	try {
//         console.log(res.data);
// 		res.render("todos");
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

module.exports = router;