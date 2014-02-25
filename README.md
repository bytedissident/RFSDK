A simple node.js Client & Server

Server:

1. Drop RFSDK_server.js on your serverm in the appropriate directory

2. Make sure the port matches the port you are going to use, it defaults to 8000. This can be found on line 9

   port = process.argv[2] || 8000;

Client:

1. In your RFSDK_client.js file set the server in the options parameter. On line 9 'server':'ws://localhost:8000?user_id='. Just replace the URL and port be sure to keep ?user_id=

2. In your HTML include client objec,  <script src="RFSDK_client.js"></script>

3. In another script tag initialize the RFSDK object. The RFSDK object expects a user_id object passed to it.
   <code>
	RFSDK.init({"user_id":1},function(msg)
	{ 
	});
	</code>
Talking:

1. Simply call the RFSDK.talk method and pass a JSON string that contains at minimum a key value of to

<code>RFSDK.talk('{"to":"2","message":"hello user 2"}');</code>

This will send a message via a websocket to the user registered with the ID of 2.
