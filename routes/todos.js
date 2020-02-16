const express = require("express");
const router = express.Router();

const axios = require("axios");

const API_URL = process.env.API_URL;

router.post("/", async(req,res,next)=>{
    try {
		if(req.signedCookies.Authorization === undefined ){
            res.render("error", {
				message: "Error. User not authenticated.",
				error: { status: 401 }
			});
        }
        const response = await axios.get(`${API_URL}/todo-item`, {
            headers: {
                Cookie: `token=${req.signedCookies.Authentication}`
            }
        });
		res.status(200).render("todos", { todos: response.data });
	} catch (err) {
		console.log(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		if (req.signedCookies === undefined) {
			res.status(401).send("Error. User not authenticated.");
		} else {
			const response = await axios.get(`${API_URL}/todo-item/${req.params.id}`,
				{
					headers: {
						Cookie: `token=${req.signedCookies.Authentication}`
					}
				});
			console.log(response.data);
			res.status(200).render("todos", { todo: response.data });
		}
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;