clientManager = new function() {
    this.clients = []
    this.list = []
    this.registerClient = function(client) {
	  console.log('клиент'+this.clients.length);
        this.clients.push(client)
  	console.log('клиент зарегистрирован'+this.clients.length);
	return true;

    }

    this.broadcastMessage = function(message,user) {
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
    this.list = function(req,res) {
            res.json(this.list,200);
    }
}

exports.registerClient= function(client){
    clientManager.registerClient(client);
}

exports.list= function(req,res){
    clientManager.list(req,res);
}

exports.broadcastMessage= function(message,user){
    console.log('готов');
    clientManager.broadcastMessage(message,user);
    console.log('отдал');
}

