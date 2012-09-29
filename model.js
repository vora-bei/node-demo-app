/**
 * Created with JetBrains PhpStorm.
 * User: vora-bei
 * Date: 12.09.12
 * Time: 1:33
 * To change this template use File | Settings | File Templates.
 */



exports.index = function(email,hashed_password,salt,id){
    this.email=email;
    this.id=id;
    this.hashed_password=hashed_password;
    this.salt=salt;

    this.authenticate= function(password){
        console.log(this.hashed_password+'|||||'+password)
        return this.hashed_password==password;
    }


};


var users=[
            new exports.index('vora-bei@mail.ru','ewewe','lol',0),
            new exports.index('vora-bei@mail.ru','ewewe','lol',1)
          ]
exports.findById=function(id, call){
    call.apply(this,[users[id]])
};

exports.findOne=function(email,call){
    var id='';
    users.forEach(function(i){

        if(i.email==email){
            console.log(i)
            id=i.id;
            }
    })
    console.log(id)

        call.apply(this,['',users[id]]);
};