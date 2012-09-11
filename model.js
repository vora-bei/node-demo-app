/**
 * Created with JetBrains PhpStorm.
 * User: vora-bei
 * Date: 12.09.12
 * Time: 1:33
 * To change this template use File | Settings | File Templates.
 */



exports.User = function(email,hashed_password,salt){
    this.email=email;
    this.hashed_password=hashed_password;
    this.salt=salt;
   this.users={
     1:{email:'vora-bei@mail.ru',hashed_password: 'ewewe', salt: 'lol'},
     2:{email:'vora-bei@mail.ru',hashed_password: 'ewewe', salt: 'lol'}
   };

   this.findById=function(id, call){
       call.apply(this,this.users[id])
   };

};

