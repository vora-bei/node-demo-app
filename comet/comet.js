clientManager = new function() {
    this.clients = []

    this.registerClient = function(client) {
	  console.log('клиент'+this.clients.length);
        this.clients.push(client)
  	console.log('клиент зарегистрирован'+this.clients.length);
	return true;

    }

    this.broadcastMessage = function(message) {
        console.log('событие'+this.clients.length);
        for(var i=0; i<this.clients.length; i++) {
            var client = this.clients[i]
            console.log('отдаю');
            client.json({
                message: message
            });
        }
        this.clients = []
    }
}
exports.registerClient= function(client){
    clientManager.registerClient(client);
}
exports.broadcastMessage= function(message){
    console.log('готов');
    clientManager.broadcastMessage(message);
    console.log('отдал');
}

