const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      console.log(user);
      return res.status(400).json({ error: "email exists" });
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hashSync(password, salt);
    const newUser = new User({
      name: name,
      email: email,
      password: hashed,
    });
    await newUser.save();
    res.status(201).json({ message: "register done" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message})
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "no user" });
  }
  console.log("password:", password);
  console.log("user.password:", user?.password);
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "wrong password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token: token });
};
