const express = require("express");
const router = express.Router();

const axios = require("axios")

// const API_URL = process.env.API_URL;

router.get("/", async (req, res, next) => {
	try {
		const user = await axios.get("https://hunter-todo-api.herokuapp.com/user");
		res.status(200).json(user.data);
	} catch(err) {
		console.log(err);
	}
});

router.get("/:username", async(req,res,next)=>{
	try{
		const username = await axios.get(`https://hunter-todo-api.herokuapp.com/user?username=${req.params.username}`) 
		res.status(200).json(username.data);
	}catch(err){
		console.log(err);
	}
});




module.exports = router;
