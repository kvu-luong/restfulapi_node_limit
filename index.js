const express = require("express");
const rateLimit = require("express-rate-limit");
//https://www.npmjs.com/package/express-rate-limit
const app = express();
const port = 3000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // mean: maximun 100 request per 15 minutes
});

// Apply to all requests
app.use(limiter);

app.get('/', limiter, (req, res) => res.send('Hello world'));

const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hours window
	max: 5, // Start bloking after 5 request
	message: {'status': 429, 'message': "Too many requests"},
});

app.get("/create-account", createAccountLimiter, (req, res) => {
	res.send("create account");
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));