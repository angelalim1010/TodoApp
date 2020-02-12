const express = require("express");
const router = express.Router();

const axios = require("axios");

const API_URL = process.env.API_URL;

router.post("/login", async(req,res,next)=>{
    try {
		const response = await axios.post(`${API_URL}/auth`, {
			username: req.body.username
		});
		res.cookie("Authentication", response.data.token, {
			httpOnly: true
		});
		res.cookie("user", req.body.username, {
			httpOnly: true
		});
		res.status(200).redirect("/");
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
