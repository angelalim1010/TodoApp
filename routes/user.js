const express = require("express");
const router = express.Router();

const axios = require("axios")

// const API_URL = process.env.API_URL;

router.get("/user", async (req, res, next) => {
	const user = await axios.get("https://hunter-todo-api.herokuapp.com/user");
	res.status(200).json(user.data);
});




module.exports = router;
