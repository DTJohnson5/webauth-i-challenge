const bcrypt = require('bcryptjs');
const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/user-route.js');

router.use('/auth', authRouter);
router.use('/users', userRouter);

router.get('/', (req, res) => {
  res.json({ api: "The things I have to do!" });
});

router.post('/hash', (req, res) => {
  const password = req.body.password;

  const hash = bcrypt.hashSync(password, 12);

  res.status(200).json({ password, hash });
});

module.exports = router;
