
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , comet = require('./comet/comet')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieDecoder());
  app.use(express.session());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


app.configure('development', function(){
    app.use(express.errorHandler());
});

//Ограничение по урлам
function loadUser(req, res, next) {
    if (req.session.user_id) {
        User.findById(req.session.user_id, function(user) {
            if (user) {
                req.currentUser = user;
                next();
            } else {
                res.redirect('/sessions/new');
            }
        });
    } else {
        res.redirect('/sessions/new');
    }
}


// Сессии
app.get('/sessions/new', function(req, res) {
    res.render('sessions/new.jade', {
        locals: { user: new User() }
    });
});

app.post('/sessions', function(req, res) {
    // Найти пользователя и выставить currentUser
});

app.del('/sessions', loadUser, function(req, res) {
    // Удалить сессию
    if (req.session) {
        req.session.destroy(function() {});
    }
    res.redirect('/sessions/new');
});






app.get('/', routes.index);

app.get('/comet/subscribe', function(req,res){
    comet.registerClient(res);
});

app.get('/comet/send/:user', function(req,res){
    comet.broadcastMessage(req.param['message'],req['user']);
    res.json({
        user: 'tj'
    },200);
    
});
app.get('/comet/list', function(req,res){
    comet.list(req,res);
    res.json({
        user: 'tj'
    },200);

});
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
