const router = require('express').Router();

const Users = require('./user-model.js');
const requiresAuth = require('../auth/req-auth-middleware.js');

router.get('/', requiresAuth, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
