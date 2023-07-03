const User = require('../models/User.js')

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      ...req.body,
      password: bcrypt.hashSync(req.body.password),
    });
      res.status(200).json(user)
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
        username: req.body.username
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }
    // console.log(user.id);
    // console.log(process.env.SECRET);
    const token = jwt.sign({ id: user.id },
                           process.env.SECRET || "iac-secret",
                           {
                            algorithm: 'HS256',
                            allowInsecureKeySizes: true,
                            expiresIn: 86400, // 24 hours
                           });
    //console.log(token);
    req.session.token = token;
 
    //req.session = token;
    console.log('session: ', req.session.token )

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token:token
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};
