'use strict';

const tasksRoutes = require('./tasksRoutes'),
	authRoutes 			= require('./authRoutes');

module.exports = function(app) {
	tasksRoutes(app);
	authRoutes(app);

	app.route('/')
		.get((req, res) => {
			let html = '';
	  	html += `<h1>Welcome to the Node RESTfulAPI Home!</h1>`;
	  	html += `<a href="/tasks">Tasks</a>`;

	    res.send(html);
		})

	app.use(function(req, res) {
	  res.status(404).send({ url: req.originalUrl + ' not found' })
	});
};
