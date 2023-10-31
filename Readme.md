# Sunbird-ED Portal Mock 
This is the nodeJS application to mock the response of specific endpoints of sunbird-ED portal

## PreRequesites
* Node 16

## How to install
1. `npm install`
2. Create `.env` file in the root folder
3. Update the `.env` file with the below properties
```
PORT = 3001
TARGET_HOST = xxxx      // ex:'https://example.com'
PROXY_HOST =  xxxx      // ex:'https://proxy-server.com'
```

`TARGET_HOST` => Actual server host url which will be serving the API's for SunbirdEd-Portal  
`PROXY_HOST`  => Proxy server host url which you have created to mock the response of specific API's/end-points (suggest to use postman mock-server)  


## Improvements
* How to integrate into existing SunbirdED-Portal itself instead of separate API's
* How to load from JSON files rather than proxy host(Proxy server created for mock - Postman mock server)