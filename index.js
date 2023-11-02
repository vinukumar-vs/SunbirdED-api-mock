// include dependencies
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
// const fetch = require('node-fetch');
// const mockData = require('./loadMock.js');
const localtunnel = require("localtunnel");
const app = express();
const config = require('./config.js');

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
        node_env: config.NODE_ENV,
        port: config.PORT,
        targetHost: config.TARGET_HOST,
        proxyHost: config.PROXY_HOST,
        proxyUrls: config.PROXY_URLS
    });
});


/**
 * This is to mock all the API's of sunbird portal
 * If specific endpoints need to mock, them mention the end-points & point to specific mock server
 * https://www.npmjs.com/package/http-proxy-middleware#core-concept
 */
function createLocalServer() {
    if(verifyProxyConfig()){
        app.use('/api/', createProxyMiddleware(getMwConfig()));
        app.listen(config.PORT);
    } else {
        console.log(`The TARGET_HOST & PROXY_HOST configurations are incorrect.`);
    }
}

function getMwConfig() {
    // Proxy middleware options
    var proxyRoutes = Object.assign(...config.PROXY_URLS.map(url => ({ [url]: config.PROXY_HOST })));
    const proxyMwOptions = {
        target: config.TARGET_HOST, 
        changeOrigin: true,
        router: proxyRoutes
    };

    return proxyMwOptions
}

function verifyProxyConfig() {
    let isConfigRight = false;
    if(config.TARGET_HOST && config.PROXY_HOST ){
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
