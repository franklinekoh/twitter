const express = require('express');
const app = express();
const cors = require('cors');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

/**
 *  Routes
 */
const authRoute = require('./src/routes/auth');
const tweetRoute = require('./src/routes/tweet');
const followRoute = require('./src/routes/follow');
const timelineRoute = require('./src/routes/timeline');

app.use(express.static('public'));
/**
 * Cors
 */
app.use(cors());
/**
 * JSON and urlencoded body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));


app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tweet', tweetRoute);
app.use('/api/v1/follow', followRoute);
app.use('/api/v1/timeline', timelineRoute);

//uncomment for better error handling interface during development
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

module.exports = server;
