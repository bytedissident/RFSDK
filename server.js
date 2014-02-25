var clients = [];
var WebSocketServer = require('websocket')
    .server;
var $ = require('jquery-latest');
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 8888;



//var RFSDK = require('./RFSDKServer.JS');

var server = http.createServer(function(request, response) {})
    .listen(parseInt(port, 10));

wsServer = new WebSocketServer({
    httpServer: server
});
// WebSocket server
wsServer.on('request', function(request) 
{
  var connection = request.accept(null, request.origin);
  var q = request.resourceURL.query;
  var client = 
  {
    'id': q.app_id,
    'platform': q.platform,
    'connection': connection,
    'socketUser': q.user,
    'account_id': q.account_id
  };

  //console.log(client);
  clients.push(client);
  console.log("Q");
  console.log(q);
  //console.log(client);
  connection.on('message', function(message) 
  {
     //console.log("34");
 });
  connection.on('close', function(connection) {
        // close user connection
  });
});
console.log("Static file server running at\n => http://localhost:" + port + "/\nCTRL + C to shutdown");
