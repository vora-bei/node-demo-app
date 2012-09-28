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
        console.log('событие'+this.list.length);
        this.list.push({ message: message, id: user.id})
        for(var i=0; i<this.clients.length; i++){
            var client = this.clients[i]
            console.log('отдаю');

            client.json({
                message: message,
                id: user.id
            });
        }
        this.clients = []
    }
    this.getList = function(req,res) {
          return  this.list;
    }
}

exports.registerClient= function(client){
    clientManager.registerClient(client);
}

exports.list= function(req,res){
    return clientManager.getList(req,res);
}

exports.broadcastMessage= function(message,user){
    console.log('готов');
    clientManager.broadcastMessage(message,user);
    console.log('отдал');
}

