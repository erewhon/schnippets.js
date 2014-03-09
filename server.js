//setup Dependencies

// todo : add flash messages!
// todo : figure out why locals aren't working!

var express = require('express')
    , port = (process.env.PORT || 8081)
    , mysql = require('mysql')
    , qconf = require('qconf')
    , config = qconf();

var db = mysql.createConnection({
    host: config.get('db_host'),
    user: config.get('db_user'),
    password: config.get('db_password'),
    database: config.get('db_database')});

db.connect();

//Setup Express
var app = express();

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: false });
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: "shhhhhhhhh!"}));
    app.use(app.router);
    app.use(express.static(__dirname + '/static'));
});

//setup the errors
app.use(function (err, req, res, next) {
    if (err instanceof NotFound) {
        res.render('404.jade', { locals: {
            title: '404 - Not Found', description: '', author: ''
        }, status: 404 });
    } else {
        res.render('500.jade', { locals: {
            title: 'The Server Encountered an Error', description: '', author: '', error: err
        }, status: 500 });
    }
});

app.listen(port);

///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

app.get('/', function (req, res) {
    res.render('index.jade', {
        locals: {
            title: 'Welcome to Schnippets!', description: 'A schnazzy productivity tool', author: 'Steven Byrnes'
        }
    });
});

app.get('/schnippet', function (req, res) {

    // if req.session.user doesn't existing, redirect to login...
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }

    res.render('schnippet.jade', {
        locals: {
            title: 'Enter a schnippet', description: 'A schnazzy productivity tool', author: 'Steven Byrnes'
        }
    });
});

app.post('/schnippet', function (req, res) {

    // if req.session.user doesn't existing, redirect to login...
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }

    var data = { content: req.body.stuff, user_id: req.session.user.id};

    db.query('INSERT INTO SCHNIPPETS SET ?', data);

    res.redirect('/');
});

app.get('/login', function (req, res) {
    res.render('login.jade', {
        locals: {
            title: 'Login', description: 'Login', author: 'Steven Byrnes'
        }
    });
});

app.post('/login', function (req, res) {

    db.query('SELECT * FROM USERS WHERE email = ?', [req.body.email], function (err, rows, fields) {
        if (err) throw err;

        req.session.user = rows[0];

        res.redirect('/');
    });

    //res.redirect('/');
});


//A Route for Creating a 500 Error (Useful to keep around)
app.get('/500', function (req, res) {
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
//app.get('/*', function(req, res){
//    throw new NotFound;
//});

//function NotFound(msg){
//    this.name = 'NotFound';
//    Error.call(this, msg);
//    Error.captureStackTrace(this, arguments.callee);
//}
//

console.log('Listening on http://0.0.0.0:' + port);
