//File for todo
const express = require("express");
const router = express.Router();

const axios = require("axios");

const API_URL = process.env.API_URL;


// get all todos from currently authenticated user
router.get("/", async (req, res, next) => {
	try {
		if (req.signedCookies.Authentication === undefined) {
			res.render("error", {
				message: "Error. User not authenticated.",
				error: { status: 401 }
			});
		} else {
			const response = await axios.get(`${API_URL}/todo-item`, {
				headers: {
					Cookie: `token=${req.signedCookies.Authentication}`
				}
			});
			res.status(200).render("todos", { todos: response.data.filter(x=> !x.deleted) });
		}
	} catch (err) {
		if (err.response.status === 404) {
			res.status(404).render("todos", { todos: [] });
		}
		console.log(err);
	}
});

//get todo from todo id
router.get("/:id", async (req, res, next) => {
	try {
		if (req.signedCookies === undefined) {
			res.status(401).send("Error. User not authenticated.");
		} else {
			const response = await axios.get(
				`${API_URL}/todo-item/${req.params.id}`,
				{
					headers: {
						Cookie: `token=${req.signedCookies.Authentication}`
					}
				}
			);
			console.log(response.data);
			res.status(200).render("todo", { todo: response.data });
		}
	} catch (err) {
		console.log(err);
	}
});


//post new todo
router.post("/", async(req, res, next)=>{
	try {
		if (req.signedCookies.Authentication === undefined) {
			res.render("error", {
				message: "Error. User not authenticated.",
				error: { status: 401 }
			});
		} else {
			await axios({
				method: "POST",
				url: `${API_URL}/todo-item`,
				headers: {
					Cookie: `token=${req.signedCookies.Authentication}`
				},
				data: {
					content: req.body.content
				}
			});
			res.status(200).redirect("/todos");
		}
	} catch (err) {
		console.log(err);
	}
})


//update todo, axios put but is a POST request

router.post("/:id/update", async(req,res,next)=>{
	try {
		if (req.signedCookies === undefined) {
			res.render("error", {
				message: "Error. User not authenticated.",
				error: { status: 401 }
			});
		} else {
			await axios({
				method: "PUT",
				url: `${API_URL}/todo-item/${req.params.id}`,
				headers: {
					Cookie: `token=${req.signedCookies.Authentication}`
				},
				data: {
					completed: req.body.completed === "Done"
				}
			});
			res.status(200).redirect("/todos");
		}
	} catch (err) {
		console.log(err);
	}
})

//delete todo by todo id
//get request but axios delete
router.get("/:id/delete", async(req,res,next)=>{
	try {
		if (req.signedCookies === undefined) {
			res.render("error", {
				message: "Error. User not authenticated.",
				error: { status: 401 }
			});
		} else {
			await axios.delete(`${API_URL}/todo-item/${req.params.id}`, {
				headers: {
					Cookie: `token=${req.signedCookies.Authentication}`
				}
			});
			res.status(200).redirect("/todos");
		}
	} catch (err) {
		console.log(err);
	}
})

module.exports = router;
