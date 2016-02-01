/**
 * Created by erwincdl on 06/01/16.
 */

var Imap = require('imap');
var quotedPrintable = require('quoted-printable');
var S = require('string');

var imap = new Imap({
    user: 'jaimebot.exo@gmail.com',
    password: 'exoexo123',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
});


function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}


imap.once('ready', function () {

    openInbox(function (err) {
        if (err) throw err;
        imap.search(['SEEN', ['FROM', 'AgustinC@exo.com.ar']], function (err, results) {

            var msgs = [];

            var f = imap.seq.fetch(results, {
                bodies: ['HEADER.FIELDS (FROM DATE)', 'TEXT'],
                struct: true
            });


            f.on('message', function (msg) {

                var incMsg = {};

                msg.on('body', function (stream) {
                    var buffer = '';
                    stream.on('data', function (chunk) {
                        buffer += chunk.toString('utf8');
                    });

                    stream.once('end', function () {

                        var wallOfText = S(buffer.toString()).between('Sugerencias', 'Minutas').toString();
                        if (wallOfText !== '') {
                            incMsg.body = 'Sugerencias'+ wallOfText;
                        }
                        incMsg.date = Imap.parseHeader(buffer).date;
                        incMsg.from = Imap.parseHeader(buffer).from;
                    });
                });

                msg.once('end', function () {
                    incMsg.from = incMsg.from[0];
                    incMsg.date = incMsg.date[0];
                    msgs.push(incMsg);
                });

            });
            f.once('error', function (err) {
                console.log('Fetch error: ' + err);
            });
            f.once('end', function () {


                imap.end();
                msgs.map((email) => {
                    email.body = quotedPrintable.decode(email.body);
                    return email;
                });

                cb(msgs);
            });
        })
    });
});

imap.once('error', function (err) {
    console.log(err);
});

imap.once('end', function () {
    console.log('Connection ended');
});

var cb;


var readEmails = function (callback) {

    cb = callback;
    imap.connect();

};

module.exports = readEmails;