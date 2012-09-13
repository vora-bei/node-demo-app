/**
 * Created with JetBrains PhpStorm.
 * User: vora-bei
 * Date: 12.09.12
 * Time: 1:33
 * To change this template use File | Settings | File Templates.
 */

var users={
    1:{email:'vora-bei@mail.ru',hashed_password: 'ewewe', salt: 'lol'},
    2:{email:'vora-bei@mail.ru',hashed_password: 'ewewe', salt: 'lol'}
};

exports.index = function(email,hashed_password,salt){
    this.email=email;
    this.hashed_password=hashed_password;
    this.salt=salt;



};


exports.findById=function(id, call){
    call.apply(this,[this,this.users[id]])
};

exports.findOne=function(email,call){
    var flag=false;
    users.forEach(function(){
        if(this.email==email)
            flag=true;
    })
    flag&&call.apply(this,['',this,this.users[id]]);
};