const { response } = require('express');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user');

const router = express.Router();

const generateToken = user => {
  const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });

  return token;
};

router.post('/register', async (req, res) => {
  const {email} = req.body;

  try {
    if (await User.findOne({email}))
      return res.status(400).send({error: 'User already exists'})

    const user = await User.create(req.body);
    
    user.password = undefined;

    return res.status(201).send({user, token: generateToken(user)});
  } catch (err) {
    console.log(err.message)
    return res.status(400).send({error: "Regitration failed"});
  }
})

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email}).select('+password');

  if( !user)
    return res.status(400).send({ error: "User not found!"});

  if( !await bcrypt.compare(password, user.password))
    return res.status(400).send({errror: "Password invalid."})

  user.password = undefined;

  return res.status(200).send({user, token: generateToken(user)})
})

module.exports = app => app.use('/auth', router);