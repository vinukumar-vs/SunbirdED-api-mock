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
4. `npm run start`

## Improvements
* How to integrate into existing SunbirdED-Portal itself instead of separate API's
* How to load from JSON files rather than proxy host(Proxy server created for mock - Postman mock server)

## How to use

<img width="588" alt="image" src="https://github.com/vinukumar-vs/SunbirdED-api-mock/assets/4496096/d83dc44c-2858-49c4-bb6a-5094f5ca1121">


**Step 1:**  
Import the sample [postman collection](https://github.com/vinukumar-vs/SunbirdED-api-mock/tree/main/postman.collection) file into postman. Use this collection as a mock collection for Postman mock server.  
Mock the API that you want to - Ex: Channel read api below  
```
curl --location 'https://dbcf2201-123f-4729-b5a5-0af277e92f7e.mock.pstmn.io/api/channel/v1/read/0135261634806579203'
```

**Step 2:**  
Create the [Postman mock server](https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/setting-up-mock/) to mock specific API response. Use the above collection to mock the API's by pointing the postman mock server to the above collection.

**Step 3:**  
Take the Postman mock server URL to configure for SunbirdED-api-proxy(nodeJS application)

**Step 4:**  
Add the mock endpoint into the SunbirdED-api-proxy(nodeJS application) config.js(PROXY_URLS) file.
```
const PROXY_URLS =[
    '/api/channel/v1'
]
```

**Step 5:**  
Run `npm run start` command in the root folder of the application.

**Step 6:**  
Use this mock server for the nodeJS applications of Sunbird  
ex: [SunbirdED-Portal](https://github.com/Sunbird-Ed/SunbirdEd-portal) change the `.env` file `SB_DOMAIN=http://localhost:3001`

