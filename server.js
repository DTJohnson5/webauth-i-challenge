const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStorage = require("connect-session-knex")(session);

const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/user-route.js");
const knexConnection = require("./data/db-config.js");

const server = express();

const sessionConfig = {
  name: "DT Johnson",
  secret: process.env.COOKIE_SECRET || "You are not worthy!",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === "development" ? false : true,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStorage({
    knex: knexConnection,
    clearInterval: 1000 * 60 * 10,
    tablename: "user_session",
    sidfieldname: "id",
    createtable: true
  })
};

const globalMiddleWare = require("./api/middleware.js");

globalMiddleWare(server);

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "Up", session: req.session });
});

module.exports = server;
