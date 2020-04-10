require('dotenv').config();
var express = require('express');
var app = express();
var api = require('./controllers/apicontroller');
var apiuser = require('./controllers/apicreateusercontroller');
var sequelize = require('./db');

sequelize.sync();      // tip: pass in {force: true} for resetting tables

app.use(express.json());
app.use(require('./middleware/headers'));

app.use('/api/user', apiuser);

app.use(require('./middleware/validate-session'));

/*****************************************************
 * PROTECTED ROUTES 
 * Those controllers called after the validate-session
 * above require an incoming request to have a token.
 *****************************************************/

app.use('/api', api);


app.listen(3002, function() {
    console.log('App is listening on 3002.');
});


