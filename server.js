const express = require('express'),
    app = express(),
    cors = require('cors'),
    errorhandler = require('errorhandler'),
    bodyParser = require('body-parser');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

/**
 *
 */
const authRoute = require('./src/routes/auth');
/**
 * Cors
 */
app.use(cors());
/**
 * JSON and urlencoded body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1/auth', authRoute);

if (!isProduction) {
    app.use(errorhandler({ log: true }));
}

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function(err, req, res, next) {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({'errors': {
                message: err.message,
                error: err
            }});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
            message: err.message,
            error: {}
        }});
});

const server = app.listen( process.env.APP_PORT || 3000, function(){
    console.log('Listening on port ' + server.address().port);
});

