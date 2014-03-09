// top level functions:
//    send reminder
//    send summary

var jade = require('jade'),
    mysql = require('mysql'),
    nodemailer = require("nodemailer"),
    qconf = require('qconf'),
    config = qconf();

var smtpTransport = nodemailer.createTransport("SMTP", {
    host: config.get('mail_host'),
    port: config.get('mail_port'),
    secureConnection: config.get('mail_secureConnection'),
    auth: {
        user: config.get('mail_user'),
        pass: config.get('mail_password')
    }
});
var mailOptions = {
    from: config.get('mail_from')
};

var buildContent = function (row) {
    return jade.renderFile('views/digest.jade', {});
};

var db = mysql.createConnection({
    host: config.get('db_host'),
    user: config.get('db_user'),
    password: config.get('db_password'),
    database: config.get('db_database')});

db.connect();

// todo : change to iterator over all users.  then, for each user, check what they FOLLOW
db.query('select u.name, u.email, s.dte, s.content from USERS u LEFT JOIN SCHNIPPETS s ON u.id = s.user_id', function (err, rows, fields) {
    if (err) throw err;

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];

        mailOptions.to = row.email;
        mailOptions.subject = "Here is your daily schnippet " + row.name;
        mailOptions.html = buildContent(row);

//        console.log(mailOptions);

//        // send mail with defined transport object
//        smtpTransport.sendMail(mailOptions, function (error, response) {
//            if (error) {
//                console.log(error);
//            } else {
//                console.log("Message sent: " + response.message);
//            }
//
//            // if you don't want to use this transport object anymore, uncomment following line
//            //        smtpTransport.close(); // shut down the connection pool, no more messages
//        });
    }
});


