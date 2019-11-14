const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');

module.exports = (req, res, next) => {
  if (req.session && req.session.loggedin) {
    next();
  } else {
    res.status(401).json({Denial: "You Are NOT WORTHY!!!"});
  }

  // let { username, password } = req.headers;

  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({Invalid: 'Those credentials are invalid.'});
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       res
  //         .status(500)
  //         .json({Error: 'There was an error processing your request. Please try again later.'});
  //     });
  // } else {
  //   res.status(400).json({Required: 'Please enter the required information.'});
  // }
};
