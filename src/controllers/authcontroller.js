const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const user = User.findOne({ email }); 
  if (user) {
    return res.status(400).json({ error: 'email exists' });
  }
  const salt = bcrypt.genSaltSync(10); 
  const hashed = bcrypt.hashSync(password, salt);
  const newUser = new User({
    name: name,
    email: email,
    password: hashed
  });
  newUser.save(); 
  res.status(201).json({ message: 'register done' });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email }); 
  if (!user) {
    return res.status(400).json({ error: 'no user' });
  }
  const match = bcrypt.compareSync(password, user.password); 
  if (!match) {
    return res.status(400).json({ error: 'wrong password' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expire: '1h' }); 
  res.json({ token: token });
};
>>>>>>> feature/pollings
