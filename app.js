const http = require('http');
const routes = require("./routes");

// const handler = routes.requestHandler;

const server = http.createServer(routes.handler);
// const server = http.createServer(routes);


server.listen(3000,()=> console.log("Server started!"))