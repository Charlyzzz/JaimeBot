/**
 * Created by erwincdl on 06/01/16.
 */
'use strict';

var mailing = require('./mailing');

var bot = require('./telegramBot');
var UserRepository = require('./models').UserRepository;
var userRepository = new UserRepository();

//bot.onText(/\/hola/, function (msg) {
//    var chatId = msg.chat.id;
//    var opts = {
//        reply_to_message_id: msg.message_id,
//        reply_markup: JSON.stringify({
//            keyboard: [
//                ['Bien'],
//                ['Mal']],
//            one_time_keyboard: true
//        })
//    };
//
//    bot.sendMessage(chatId, 'Hola @' + msg.from.username + ', Como estas? Enviando un email a tu nombre.', opts);
//
//    var email = {
//        from: 'JaimeBot de Exo ✔ <jaimebot.exo@gmail.com>',
//        to: 'erwincdl@gmail.com',
//        subject: 'Telegram bot ✔',
//        text: 'Probando! ✔'
//        //,html: '<b>Hello world ✔</b>'
//    };
//
//});



bot.onText(/^\/subscribe/, function (msg) {

    userRepository.add(msg.from);
    bot.respond(msg, `Ahora estas subscripto!`)
});

bot.onText(/^\/status$/, function (msg) {

    var userId = msg.from.id;
    var status = userRepository.getStatus(userId);
    let message;
    if (status === undefined) {
        message = `No te encontrás registrado! Enviá registrar al 2020`;
    } else {
        var status = status? 'registrado' : 'no registrado';
        message = 'Estás ' + status + '!';
    }

    bot.respond(msg, message);
});


bot.onText(/^\/pedir (.+)/, function (msg,match) {

    var userId = msg.from.id;
    var comida = match[1];


    bot.sendMessage(msg.chat.id, 'Hi!')

});