/**
 * Created by erwincdl on 06/01/16.
 */
'use strict';

var readEmails = require('./mailing');

var bot = require('./telegramBot');

var UserRepository = require('./models').UserRepository;
var userRepository = new UserRepository();
var NotMatchedContainer = require('./monad').NotMatchedContainer;

bot.onText(/(.)/, (msg) => {

    var user = userRepository.getUser(msg.from);
    var text = msg.text;

    var resultado = [privilegedActions(user, text), notPrivilegedActions, help].reduce((anterior, nuevo) => {

        return anterior.fold(nuevo(user, text));
    });

    responder(user, resultado.value);

});

var privilegedActions = NotMatchedContainer((user, text) => {

    if (user.isSubscript) {

        if (/^\/pedir/.exec(text)) {

            if (user.isValidAlias()) {
                var menu = text.split(' ').slice(1).join(' ');
                return `Tu pedido para hoy es "${menu}"`;

            } else {
                return `No tenés alias! Registra uno con /alias`;
            }

        }

        if (/^\/alias/.exec(text)) {

            user.alias = text.split(' ')[1];

            return `Tu nombre en el email para Maria Franco va a ser "${user.alias}"`;

        }


    }
});

var notPrivilegedActions = NotMatchedContainer((user, text) => {


    if (/^\/status$/.exec(text)) {
        return 'Estas ' + user.status;
    }
    if (/^\/suscribir$/.exec(text)) {
        user.suscribe();
        return 'Ahora estás subscripto!';
    }
    if (/^\/desuscribir$/.exec(text)) {
        user.unsubscribe();
        return 'Dejaste de estar suscripto';
    }
    if (/^\/menu$/.exec(text)) {
        readEmails((emails) => {
            var email = emails.reverse().pop().body;
            responder(user, email);
        });
        return 'Se está procesando tu email!';
    }
    if (/^\/help$/.exec(text)) {
        return '/status te informa si estás subscripto o no.\n' +
            '/suscribir y /desuscribir manejan tu suscripción.\n' +
            '/pedir registra tu pedido. Requiere estar registrado y tener alias\n' +
            '/alias $alias informás el nombre con el que apareces en el pedido\n';
    }

});

var help = NotMatchedContainer(() => {
    return 'Intentaste ejecutar un comando invalido o uno que requiere estar registrado! Escribí /help para obtener más ayuda';
});

var responder = function (whom, msg) {
    bot.sendMessage(whom.id, msg);
};



