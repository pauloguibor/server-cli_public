const db = require('../models')
const User = db.user
const bcrypt = require("bcryptjs");
const { Router } = require("express")
const jwt = require("jsonwebtoken");
const { verifySignUp } = require("../middleware");
const config = require("../config/auth.config.js");

const router = Router();

router.use(function (req, res, next) {
  res.header(
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post('/signin', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 604800
      });
      res.status(200).send({
        user: user,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
})

router.post("/signup", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      res.status(200).send({ "Usuário registrado": user });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

router.post('/validateToken', (req, res) => {
  const userData = req.body || null
  try {
    if (userData){
      jwt.verify(userData.accessToken, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send(
            false
          );
        } else {
          res.send(true)
        }

      });
    }
  } catch (error) {
    
  }
  })



module.exports = router;