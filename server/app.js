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

// app.use(require('./middleware/validate-session'));  // 4/16/20 - Was calling this here, but really already have validateSession on each of the put, delete, etc. inside of the controller below,
// EXCEPT for login, as we can't have it there as the React client isn't sending a token.

/*****************************************************
 * PROTECTED ROUTES 
 * Those controllers called after the validate-session
 * above require an incoming request to have a token.
 ******************************************************/

app.use('/api', api);


app.listen(3000, function() {
    console.log('*App is listening on 3000.*');
});


