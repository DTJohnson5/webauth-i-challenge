const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/user-model.js');

router.post('/register', (req, res) => {
  let userInformation = req.body;
console.log(req.body);

  bcrypt.hash(userInformation.password, 12, (err, hashedPassword) => {
    userInformation.password = hashedPassword;

    Users.add(userInformation)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({message: `Welcome ${user.username}!`});
      } else {
        res.status(401).json({Error: 'Those credentials are invalid.'});
      }
    })
    .catch(error => {
      console.log('login error', error);
      res.status(500).json(error);
    });
});

module.exports = router;