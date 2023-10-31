// include dependencies
const express = require('express');
const env = require('dotenv').config();

// const fetch = require('node-fetch');
const { createProxyMiddleware } = require('http-proxy-middleware');
// const mockData = require('./loadMock.js');
const localtunnel = require("localtunnel");
const app = express();

// Application specific constants
// const PORT = process.env.PORT | 3001;
// const TARGET_HOST = process.env.TARGET_HOST;
// const PROXY_HOST = process.env.PROXY_HOST;
// Reference: https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/matching-algorithm/


// Proxy middleware options
const proxyMwOptions = {
    target: process.env.TARGET_HOST, 
    changeOrigin: true,
    router: {
        // '/api/channel/v1': 'http://localhost:3001/mock/',
        '/api/framework/v1/read/agriculture_framework':  process.env.PROXY_HOST,
        '/api/channel/v1' : process.env.PROXY_HOST,   // reference: https://www.npmjs.com/package/http-proxy-middleware#options
    }
};
// console.log(`proxyMwOptions ${JSON.stringify(proxyMwOptions)}`);

/**
 * To create remote access for this local nodejs server.
 */
(async () => {
    createLocalServer();
    // const tunnel = await localtunnel({ port: PORT });
    // console.log(`Remote IP to access this local server => ${tunnel.url}`);
})();

/**
 * To get the configuration of proxy middleware
 */
app.get('/config', (req, res) => {
    res.json({
        node_env: process.env.NODE_ENV,
        port: process.env.PORT,
        targetHost: process.env.TARGET_HOST,
        proxyHost: process.env.PROXY_HOST
    });
});


/**
 * This is to mock all the API's of sunbird portal
 * If specific endpoints need to mock, them mention the end-points & point to specific mock server
 * https://www.npmjs.com/package/http-proxy-middleware#core-concept
 */
function createLocalServer() {
    if(verifyProxyConfig()){
        app.use('/api/', createProxyMiddleware(proxyMwOptions));
        app.listen(process.env.PORT);
    } else {
        console.log(`The TARGET_HOST & PROXY_HOST configurations are incorrect.`);
    }
}

function verifyProxyConfig() {
    let isConfigRight = false
    if(proxyMwOptions.TARGET_HOST && proxyMwOptions.PROXY_HOST ){
        isConfigRight = true;
    }
    return isConfigRight;
}

// app.get('/mock/*', (req, res) => {
//     console.log(req.url);
//     fetch(req.url, { method: "Get" })
//     .then(res => res.json())
//     .then((json) => {
//         // do something with JSON
//     })
// });
