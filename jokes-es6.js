process.env["NTBA_FIX_319"] = 1;
import TelegramBot from 'node-telegram-bot-api';
import {
    CronJob
} from 'cron';
import request from 'request';
import {
    AllHtmlEntities
} from 'html-entities'

var entities = new AllHtmlEntities(),
    token = '542331590:AAFbJn0NN5DdHXDzutxzc2Ma8vuFc8vALpg';



var bot = new TelegramBot(token, {
    polling: true
});
bot.on('message', (msg) => {
    var id = msg.from.id;
//    bot.sendMessage(id, msg.text);
//    console.log(msg);
});


var job = new CronJob('0,30 * * * * *', () => {
    var chatId = 507280289,
        url = 'http://umorili.herokuapp.com/api/random?num=1';
    request(url, (error, response, body) => {
        var data = JSON.parse(body);
        bot.sendMessage(chatId, entities.decode(data[0].elementPureHtml));
    });
});
job.start();
