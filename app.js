const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require('http');
require('dotenv').config();
const path = require('path');
var routes = require('./routes/index');
var logger = require("./utils/winston-logger");
const fs = require('fs');
const rfs = require('rotating-file-stream');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


var logDirectory = path.join(__dirname, 'logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})
var errorLogStream = rfs('error.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})


// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    var allowedOrigins = [
 
    ];

    var origin = req.headers.origin;
    if (origin) {
        for (let i = 0; i < allowedOrigins.length; i++) {
            if (origin.match(allowedOrigins[i]) > -1) {
                res.setHeader("Access-Control-Allow-Origin", origin);
                break;
            }
        }
    }

    var method_requested = req.headers['access-control-request-method'] || 'POST';
    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        method_requested
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,Content-Type,X-Auth-Token"
    );

    // Set to true if you need the website to
    // include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // intercept OPTIONS method
    if ("OPTIONS" == req.method) {
        res.sendStatus(200);
    } else {
        // Pass to next layer of middleware
        next();
    }
});

app.use('/api/v1', routes);
// app.use(express.static(path.join(__dirname, 'docs')));
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'docs/apidoc', 'index.html'));
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") == "development" ? err : {};
    // render the error page
    logger.error("Error handler : ", err);
    return res.status(err.status || 500).send(err);
});

let server;
server = http.createServer(app);
logger.info('APP to serve http requests.')

// Listen on provided port, on all network interfaces.
server.listen(process.env.PORT);
server.on('listening', () => {
    logger.debug("Server started on port: ", server.address())
});