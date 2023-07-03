const jwt = require("jsonwebtoken");
const User = require('../models/User')


verifyToken = (req, res, next) => {
  let token = req.session.token;
  console.log(req.session.token)

  /*let token = req.session;
  console.log(req.session)*/

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token,
             process.env.SECRET || "iac-secret",
             (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              next();
             });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (user.role != "admin") {
      return res.status(403).send({
        message: "Require Admin Role!"
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (user.role != "moderator") {
      return res.status(403).send({
        message: "Require moderator Role!"
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role == "moderator" || user.role == "admin") {
      next()
    }
    else {
      return res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Moderator or Admin role!",
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};
module.exports = authJwt;
