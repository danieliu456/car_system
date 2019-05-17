const config = require('../config/config');
//var request = require('request');

const http = require("http");
var simIP = config.simIP;
var simPORT = config.simPORT;


    export const speedSet = (speed) => {

        var https = require('http');
        var querystring = require('querystring');
        console.log("Sim server speed");
        // form data
        var postData = querystring.stringify({
            speed: speed
        });
        console.log("________________")
        // request option
        var options = {
            host: simIP,
            port: simPORT,
            method: 'POST',
            path: '/sim/control',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length,
                'API-Key': "h-kd3dz+t9WCqkD%!_?5^wzCD6rA74gx",
            }
        };
        console.log('options:', options);
        console.log('postData:', postData);
        // request object
        var req = https.request(options, function (res) {
            var result = '';
            res.on('data', function (chunk) {
                result += chunk;
            });
            res.on('end', function () {
                console.log(result);
            });
            res.on('error', function (err) {
                console.log(err);
            })
        });

        // req error
        req.on('error', function (err) {
            console.log(err);
        });

        //send request witht the postData form
        req.write(postData);
        req.end();
    }

    export const updateSim = _ => {
        var https = require('http');
        var querystring = require('querystring');
        console.log("Sim server Update");
        // form data
        var postData = querystring.stringify({

        });
        console.log("________________")
        // request option
        var options = {
            host: simIP,
            port: simPORT,
            method: 'POST',
            path: '/sim/update',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'API-Key': "h-kd3dz+t9WCqkD%!_?5^wzCD6rA74gx",
            }
        };
        console.log('options:', options);
        // request object
        var req = https.request(options, function (res) {
            var result = '';
            res.on('data', function (chunk) {
                result += chunk;
            });
            res.on('end', function () {
                console.log(result);
            });
            res.on('error', function (err) {
                console.log(err);
            })
        });

        // req error
        req.on('error', function (err) {
            console.log(err);
        });

        //send request witht the postData form
        req.write(postData);
        req.end();
    }


    export const makeCarOrder = (id, string) => {
        var https = require('http');
        var querystring = require('querystring');
        console.log("Ordered Car");
        // form data
        var postData = querystring.stringify({
            id: id,
            waypoints: string
        });
        console.log("________________")
        // request option
        var options = {
            host: simIP,
            port: simPORT,
            method: 'POST',
            path: '/sim/vehicle/order',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length,
                'API-Key': "h-kd3dz+t9WCqkD%!_?5^wzCD6rA74gx"
            }
        };
        console.log('options:', options);
        console.log('postData:', postData);
        console.log(string);
        // request object
        var req = https.request(options, function (res) {
            var result = '';
            res.on('data', function (chunk) {
                result += chunk;
            });
            res.on('end', function () {
                console.log(result);
            });
            res.on('error', function (err) {
                console.log(err);
            })
        });

        // req error
        req.on('error', function (err) {
            console.log(err);
        });

        //send request witht the postData form
        req.write(postData);
        req.end();
    }
