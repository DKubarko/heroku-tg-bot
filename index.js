process.env["NTBA_FIX_319"] = 1;
var TelegramBot = require('node-telegram-bot-api'),
    cron = require('cron').CronJob,
    token = '542331590:AAFbJn0NN5DdHXDzutxzc2Ma8vuFc8vALpg';

var bot = new TelegramBot(token, {
    polling: true
});

var job = new cron('0,30 * * * * *', function () {
    console.log("Привет!");
});
job.start();

bot.on('message', function (msg) {
    var id = msg.from.id;
    bot.sendMessage(id, msg.text);
    //console.log(msg);
});
