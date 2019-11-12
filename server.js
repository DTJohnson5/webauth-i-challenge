const express = require('express');

const apiRouter = require('./api/api-router.js');

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/user-route.js');

const server = express();
const globalMiddleWare = require('./api/middleware.js');

globalMiddleWare(server);

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;