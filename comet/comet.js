clientManager = new function() {
    this.clients = []
    this.list = []
    this.registerClient = function(client) {
        this.clients.push(client)
	    return true;
    }

    this.broadcastMessage = function(message,user) {
        var message = { message: message, user_id: user.id,name: user.email},
         id=this.list.push(message),
         client='',
         list=Array();

        for(var i=0; i<this.clients.length; i++){
            client=clients[i];
            list=this.list.slice(client.param('id'))
            client.json(list);
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
    clientManager.broadcastMessage(message,user);
}

