const app = require('./app');
const http = require('http');

const port = process.env.PORT || 3030;
const host = process.env.HOST || 'localhost';

const server = http.createServer(app);

server.listen(port, () => console.log(`\nServer started on port http://${host}:${port}\n`));
