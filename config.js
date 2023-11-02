

const PORT = process.env.PORT | 3001;
const TARGET_HOST = process.env.TARGET_HOST;
const PROXY_HOST = process.env.PROXY_HOST;
const PROXY_URLS =[
    '/api/channel/v1'
]

module.exports = { PORT, TARGET_HOST, PROXY_HOST, PROXY_URLS }