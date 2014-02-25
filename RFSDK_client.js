
var connection = false;
var RFSDK = 
{
	
	websocket:false,
	options:{
		'connection':'ws',
		'server':'ws://localhost:8000?user_id='
		
	},
	params:false,
	init:function(opt,callback)
	{
		this.params = opt;

		if(this.options.connection == 'ws')
		{
			var conn = this.connect(function(msg)
			{
				if(callback)
	   	 		{
	   	 			callback({'status':'open'});
	   	 		}
			});
		} 
	},

	//CONNECT TO SOCKET
	connect:function(callback)
	{
    	window.WebSocket = window.WebSocket || window.MozWebSocket;

		if(!connection)
		{
			var url = this.options.server;
			url += this.params.user_id; 
			console.log(url)
			connection = new WebSocket(url);
		}

	    connection.onopen = function () {
			console.log('connection open');
	    };

	    connection.onerror = function (error) {
	        // an error occurred when sending/receiving data
	        console.log('connection error');
			connection = false;
			//this.deleteCookie('wsOpen');
	    };

	     connection.onclose = function ()
	    {
	        connection = false;
	    };

	    connection.onmessage = function (message) 
	    {
	    	var data = '';
	    	var d = $.parseJSON(message.data);
	    	try
	    	{
	    		data = $.parseJSON(d);

	    		//DO SOEMTHING IN YOUR SYSTEM
	    		getNotifications(data);
	    	}catch(e){}
	    }
	},

	//TALK BACK TO SOURCE
	talk:function(params)
	{
		connection.send(params);
	}
};