'use strict';

const express   = require('express'),
  app           = express(),
  port          = process.env.PORT || 3000,
  mongoose      = require('mongoose'),
  database      = require('./config/db'),
  Task          = require('./api/models/tasksModel'),
  User          = require('./api/models/userModel'),
  bodyParser    = require('body-parser'),
  jsonwebtoken  = require("jsonwebtoken");

mongoose.Promise = global.Promise;
mongoose.connect(database.url, { useCreateIndex: true, useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

const routes = require('./api/routes');
routes(app);

app.listen(port);

console.log('Auth RESTful API server started on: ' + port);

module.exports = app;