require('dotenv').config();
var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


/****************************************
* Create User
****************************************/

router.post('/', (req, res) => {

    var username = req.body.user.username;
    var pass = req.body.user.password;

    User
      .create({
          username: username,
          passwordhash: bcrypt.hashSync(pass, 10)
      })
      .then(
        function createSuccess(user) {
           var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
           res.json({
               user: username,
               message: 'created',
               sessionToken: token
           });
        }
      );
});


module.exports = router;