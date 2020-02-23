const express = require("express");
const router = express.Router();

const axios = require("axios")

const API_URL = process.env.API_URL;

router.get("/", async (req, res, next) => {
	try {
		const user = await axios.get(`${API_URL}/user`);
		res.status(200).json(user.data);
	} catch(err) {
		console.log(err);
	}
});

router.get("/:username", async(req,res,next)=>{
	try{
		const username = await axios.get(`${API_URL}/user?username=${req.params.username}`) 
		res.status(200).json(username.data);
		
	}catch(err){
		console.log(err);
	}
});

router.post("/", async(req,res,next)=>{
	try{
		await axios.post(`${API_URL}/user`, {
			username: req.body.username
		});
		const new_user = await axios.post(`${API_URL}/auth`, {
			username: req.body.username
		});
		res.cookie("Authentication", new_user.data.token, {
			signed: true,
			httpOnly: true
		});
		res.cookie("user", req.body.username, {
			signed: true,
			httpOnly: true
		});
		res.status(200).redirect("/");
	}catch(err){
		console.log(err);
	}
})




module.exports = router;
