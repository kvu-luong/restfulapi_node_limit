const express = require('express');
const app = express();
const rateLimit = require("express-rate-limit");

const http = require('http');
const server = http.createServer(app);

const port = 3000;
const host = 'localhost';

const rateLimit = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hours window
	max: 5, // Start bloking after 5 request
	message: {'status': 429, 'message': "Too many requests"},
});
app.use(rateLimit);// apply rate limit

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});