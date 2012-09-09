
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
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/subscribe', function(req,res){
    comet.registerClient(res);
});

app.get('/publish', function(req,res){
    comet.broadcastMessage(req.param['message']);
    res.json({
        user: 'tj'
    },200);
    
});
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
