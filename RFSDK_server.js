var clients = [];
var WebSocketServer = require('websocket')
    .server;
var $ = require('jquery-latest');
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 8000;
var clientId;

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
  //console.log(q);
  var client = 
  {
    'id':q.user_id,
    'connection': connection
  };

  //STORE CLIENT ID
  clientId = q.user_id;

  var hasConnected = false;
  //CHCEK TO SEE IF THIS USER HAS ALREADY CONNECTED, IF SO UPDATE THEIR CONNECTION
  for (var i = 0; i < clients.length; i++) 
  {
    if(clients[i]["id"] == clientId)
    {
      var c =  
      {
        'id':q.user_id,
        'connection': connection
      };
      clients[i] = c;
      hasConnected = true;
    }
  };

  //USER IS NEW
  if(!hasConnected)
  {
    clients.push(client);
  }

  //debug
  console.log(clients.length);
  
  connection.on('message', function(message) 
  {
    if (message.type === 'utf8') 
    {
      var data = message.utf8Data;
      var d;
      try{
        d =  JSON.parse(data);
        
      }catch(e){
        console.log(e);
      }
      
      $.each(clients, function()
      {
        var c = this;
        try
        {
           if(d.to == c.id)
          {
            console.log(d.to +'=='+c.id);
            c.connection.sendUTF(JSON.stringify(message.utf8Data));  
          } 
        }catch(e){}
      });
    }  
 });
  connection.on('close', function(connection) {
        // close user connection
  });
});
console.log("Static file server running at\n => http://localhost:" + port + "/\nCTRL + C to shutdown");