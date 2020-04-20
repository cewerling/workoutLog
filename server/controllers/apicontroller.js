require('dotenv').config();
var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var Log = sequelize.import('../models/log');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');

/****************************************
 * User Login
****************************************/

router.post('/login', (req, res) => {

    User
    .findOne({
        where: {username: req.body.user.username}
    })
    .then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                    if (matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({ error: "you failed, yo"});
                    }
                });
            } else {
                res.status(500).send({ error: "failed to authenticate" });
            }
        },
        function (err) {
            res.status(501).send({error: "you failed, yo"});
        }
    );
});



/****************************************
* CREATE Workout Log
****************************************/

router.post('/log', validateSession, (req, res) => {

    const logFromRequest = {
        "description": req.body.log.description,
        "definition": req.body.log.definition,
        "result": req.body.log.result,
        "owner": req.user.id
        // "owner": req.body.owner
    }
    console.dir(logFromRequest);
    Log.create(logFromRequest)
      .then(log => {res.status(200).json(log);})
      .catch(err => res.json(req.errors))

});




/****************************************
* GET All Logs for Individual User
****************************************/

router.get('/log', validateSession, (req, res) => {

    Log.findAll({
        where: {owner: req.user.id}
        // where: {owner: req.body.owner}
    })
      .then(log => res.status(200).json(log))
      .catch(err => res.status(500).json({error:err}))

});




/****************************************
* GET Individual Logs by ID for a User
****************************************/

router.get('/log/:id', validateSession, (req, res) => {

    Log.findAll({
        where: {
            // owner: req.body.owner,
            owner: req.user.id,
            id: req.params.id
        }
    })
      .then(log => res.status(200).json(log))
      .catch(err => res.status(500).json({error:err}))

});




/****************************************
* UPDATE Individual Logs
****************************************/

router.put('/log/:id', validateSession, (req, res) => {

    const logFromRequest = {
        "description": req.body.log.description,
        "definition": req.body.log.definition,
        "result": req.body.log.result
    }
    Log.update(logFromRequest, {where: {owner: req.user.id, id: req.params.id}})
      .then(log => {res.status(200).json(log);})
      .catch(err => res.json(req.errors))

});




/****************************************
* Delete Individual Logs
****************************************/

router.delete('/log/:id', validateSession, (req, res) => {

    Log.destroy({where: {owner: req.user.id, id: req.params.id}})
      .then(log => {res.status(200).json(log);})
      .catch(err => res.json(req.errors))

});



module.exports = router;