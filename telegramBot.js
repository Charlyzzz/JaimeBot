/**
 * Created by erwincdl on 07/01/16.
 */

var TelegramBot = require('node-telegram-bot-api');

var auth_token = '167079872:AAEb-mgHi60I0372k_4yY31T8iXRHaNrKmk';
var opts = {polling: true};

var bot = new TelegramBot(auth_token, opts);


module.exports = bot