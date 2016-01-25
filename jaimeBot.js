/**
 * Created by erwincdl on 06/01/16.
 */
'use strict';

var mailing = require('./mailing');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Meal = require('./persistance.js');

var bot = require('./telegramBot');

bot.onText(/\/hola/, function (msg) {
    var chatId = msg.chat.id;
    var opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: [
                ['Bien'],
                ['Mal']],
            one_time_keyboard: true
        })
    };

    bot.sendMessage(chatId, 'Hola @' + msg.from.username + ', Como estas? Enviando un email a tu nombre.', opts);

    var email = {
        from: 'JaimeBot de Exo ✔ <jaimebot.exo@gmail.com>',
        to: 'erwincdl@gmail.com',
        subject: 'Telegram bot ✔',
        text: 'Probando! ✔'
        //,html: '<b>Hello world ✔</b>'
    };

});