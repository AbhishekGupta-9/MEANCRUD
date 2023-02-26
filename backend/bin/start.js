'use strict';


require('@babel/register');
require('@babel/polyfill');

const app = require('../app').default;
var http = require('http');
var options = {}
// creating server
const config = require("../config/config.js").get(process.env.NODE_ENV);
const { PORTS } = config;
const server = http.createServer(options, app);


// server.on('listening', () => {
   
// });
server.listen(PORTS.API_PORT,()=>{
    console.log(`Listening on ${PORTS.API_PORT}`);

})