 var mqtt;
            var reconnectTimeout = 2000;
            var host = "localhost";
            var port = 55555;

            function onConnect() {
               
				 mqtt.subscribe('messages');
				  console.log("Connected MQTT CLient");
               // message = new Paho.MQTT.Message("Hello World");
               // message.destinationName = "sensor1";
               // mqtt.send(message);
            }
			
			function onConnectionLost(responseObject) {
			  if (responseObject.errorCode !== 0) {
				console.log("onConnectionLost:"+responseObject.errorMessage);
			  }
			}

            function MQTTconnect() {
                
                mqtt = new Paho.MQTT.Client(host, port, "Clientjs");
				mqtt.onConnectionLost = onConnectionLost;
				mqtt.onMessageArrived  = function(message){
					console.log('New msg: '+message.payloadString);
					var msg = JSON.parse(message.payloadString);
					draw(msg.btn);
				};
				console.log("Connected to " + host + " " + port);
                var options = {
                    timeout: 3,
                    onSuccess: onConnect,
                };
                mqtt.connect(options);
				
			 
            };
			
			MQTTconnect();