//File for login and logout of user

const express = require("express");
const router = express.Router();

const axios = require("axios");

const API_URL = process.env.API_URL;

// "https://hunter-todo-api.herokuapp.com"



//POST for login 
//auth/login
router.post("/login", async(req,res,next)=>{
    try {
		const response = await axios.post(`${API_URL}/auth`, {
			username: req.body.username
		});
		res.cookie("Authentication", response.data.token, {
			signed: true,
			httpOnly: true
		});
		res.cookie("user", req.body.username, {
			signed: true,
			httpOnly: true
		});
		res.status(200).redirect("/");
	} catch (err) {
		if (err.response.status === 400) {
			res.render("error", {
				message: "Error. User doesn't exist. Please signup",
				error: { status: 400 }
			})
		}
		console.log(err);
	}
});

//GET for logout 
// /auth/logout
router.get("/logout", async(req,res,next)=>{
	try {
		res.clearCookie("Authentication");
		res.clearCookie("user");
		res.status(200).redirect("/");
		console.log("logout successfully");
	} catch (err) {
		console.log(err);
	}
})

module.exports = router;
