
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , comet = require('./comet/comet')
  , user = require('./routes/user')
  , http = require('http')
  , User = require('./model')
  , path = require('path'),
    flash = require('connect-flash');;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  //app.set('view options', { layout: false });
  app.use(express.bodyParser());
    app.use(express.cookieParser());
  app.use(express.favicon());
  app.use(express.logger('dev'));

  app.use(flash());
  app.use(express.session({ secret: "keyboard cat" }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


app.configure('development', function(){
    app.use(express.errorHandler());
});

//Ограничение по урлам
function loadUser(req, res, next) {
    console.log('loadUser');
    if (req.session.user_id) {
        User.findById(req.session.user_id, function(user) {
            if (user) {
                console.log('ДА');
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


app.get('/404', function(req, res) {
    throw new NotFound;
});

app.get('/500', function(req, res) {
    throw new Error('An expected error');
});

app.get('/bad', function(req, res) {
    unknownMethod();
});
/*
function authenticateFromLoginToken(req, res, next) {
    var cookie = JSON.parse(req.cookies.logintoken);

    LoginToken.findOne({ email: cookie.email,
        series: cookie.series,
        token: cookie.token }, (function(err, token) {
        if (!token) {
            res.redirect('/sessions/new');
            return;
        }

        User.findOne({ email: token.email }, function(err, user) {
            if (user) {
                req.session.user_id = user.id;
                req.currentUser = user;

                token.token = token.randomToken();
                token.save(function() {
                    res.cookie('logintoken', token.cookieValue, { expires: new Date(Date.now() + 2 * 604800000), path: '/' });
                    next();
                });
            } else {
                res.redirect('/sessions/new');
            }
        });
    }));
}*/
// Users
app.get('/users/new', function(req, res) {
    res.render('users/new.jade',
        { user: new User.index(),error : req.flash('error'),info : req.flash('info') }
    );
});

app.post('/users.:format?', function(req, res) {
    var user = new User.index(req.body.user);

    function userSaveFailed() {
        req.flash('error', 'Account creation failed');
        res.render('users/new.jade', { user: user });
    }
user.save(function(err) {
    if (err) return userSaveFailed();

    req.flash('info', 'Your account has been created');
    emails.sendWelcome(user);

    switch (req.params.format) {
        case 'json':
            res.send(user.toObject());
            break;

        default:
            req.session.user_id = user.id;
            res.redirect('/');
    }
 });
});

// Сессии
app.get('/sessions/new', function(req, res) {
    res.render('sessions/new.jade',
        {user: new User.index(), error : req.flash('error') }
    );
});



    app.post('/sessions', function(req, res) {
        console.log('сессии');
        User.findOne(req.body.user.email, function(err, user) {
            if (user && user.authenticate(req.body.user.password)) {
                req.session.user_id = user.id;
                console.log('аутификация');
                // Remember me
                if (req.body.remember_me) {
                    var loginToken = new LoginToken({ email: user.email });
                    loginToken.save(function() {
                        res.cookie('logintoken', loginToken.cookieValue, { expires: new Date(Date.now() + 2 * 604800000), path: '/' });
                        res.redirect('/');
                    });
                } else {
                    console.log('до редиректа');
                    res.redirect('/');
                }
            } else {
                req.flash('error', 'Incorrect credentials');
                res.redirect('/sessions/new');
            }
        });
    });

app.del('/sessions', loadUser, function(req, res) {
    if (req.session) {
        //LoginToken.remove({ email: req.currentUser.email }, function() {});
        //res.clearCookie('logintoken');
        req.session.destroy(function() {});
    }
    res.redirect('/sessions/new');
});






app.get('/',loadUser, routes.index);

app.get('/comet/subscribe', function(req,res){
    comet.registerClient(res);
});

app.get('/comet/send/',loadUser, function(req,res){
    comet.broadcastMessage(req.param('message'),req.currentUser);
    console.log(req.param('message'))
    var a={
        'message' : req.currentUser.email,
        id: 1+1,
        name: 'lol'
    }
    res.json(a,200);
    
});
app.get('/comet/list', function(req,res){
    res.json(comet.list(req,res),200);
});
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
