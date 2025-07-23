const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = (req,res) => {
    const {name,email, password } = req.body;
    const userExist = User.findOne({email});
    if(userExist){
        return res.send(400)
    }
    const hash = bcrypt.genSalt(10);
    const hashPassword = bcrypt.hash(password, hash);
    const newUser = new User ({
        name,
        email,
        password: hashPassword
    });
   newUser.save();
   res.status(201).json({message: 'register ok'})
};

exports.login = (req,res) => {
    const {email,password} = req.body;
    const user = User.findOne({email});
    if(!user) {
        return res.status(400)
    }
    const match = bcrypt.compare(password, user.password);
    if(!match) {
        return res.send('password is not match')
    }
    const token = jwt.sign({id: user._id }, process.env.JWT_SECRET,{expireIn:'1h'});
    res.json({token});
}

exports.profile = (req, res) => {
  res.json({
    message: 'User info',
    user: req.user
  });
};