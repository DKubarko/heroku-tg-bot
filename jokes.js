process.env["NTBA_FIX_319"] = 1;
var TelegramBot = require('node-telegram-bot-api'),
    cron = require('cron').CronJob,
    request = require('request'),
    entities = require('html-entities').AllHtmlEntities,
    token = '542331590:AAFbJn0NN5DdHXDzutxzc2Ma8vuFc8vALpg',
    fs = require('fs'),
    chatId = 1,
    f = 0;

var bot = new TelegramBot(token, {
    polling: true
});
bot.on('message', function (msg) {
    chatId = msg.chat.id;
    if (msg.text.toLowerCase().indexOf('привет') != -1 || msg.text.toLowerCase().indexOf('здравствуй') != -1 || msg.text.toLowerCase() == 'хай' || msg.text.toLowerCase() == 'hi' || msg.text.toLowerCase() == 'hello' || msg.text.toLowerCase().indexOf('салют') != -1) {
        if (msg.from.last_name == undefined) {
            bot.sendMessage(chatId, 'Привет, ' + msg.from.username + '!');
        } else {
            bot.sendMessage(chatId, 'Привет, ' + msg.from.first_name + ' ' + msg.from.last_name + '!');
        }
    } else if (msg.text.toLowerCase().indexOf('смех') != -1 || msg.text.toLowerCase().indexOf('смеш') != -1 || msg.text.toLowerCase().indexOf('расскажи анекдот') != -1 || msg.text.toLowerCase().indexOf('расскажи шутку') != -1) {
        var url = 'http://umorili.herokuapp.com/api/random?num=1';
        request(url, function (error, response, body) {
            var data = JSON.parse(body);
            bot.sendMessage(chatId, entities.decode(data[0].elementPureHtml));
        });
    } else if (msg.text.toLowerCase() == '/start') {
        bot.sendMessage(chatId, 'Привет ' + msg.from.first_name + ' ' + msg.from.last_name + ', меня зовут StyleBot. Я могу поговорить с тобой и развеселить шутками!');
    } else if (msg.text.toLowerCase().indexOf('как дела') != -1 || msg.text.toLowerCase().indexOf('как настроение') != -1) {
        bot.sendMessage(chatId, 'Всё отлично, взламываю ваш профиль');
        bot.sendMessage(chatId, 'А у вас как настроение?');
    } else if (msg.text.toLowerCase().indexOf('отлично') != -1 || msg.text.toLowerCase().indexOf('хорошо') != -1 || msg.text.toLowerCase().indexOf('нормально') != -1 || msg.text.toLowerCase().indexOf('шикарно') != -1 || msg.text.toLowerCase().indexOf('класно') != -1 || msg.text.toLowerCase().indexOf('круто') != -1) {
        bot.sendMessage(chatId, 'Я рад за вас!');
    } else if (msg.text.toLowerCase().indexOf('танцы') != -1 || msg.text.toLowerCase().indexOf('танцевать') != -1 || msg.text.toLowerCase().indexOf('танец') != -1) {
        bot.sendMessage(chatId, 'Я обожаю танцевать под техно');
    } else if (msg.text.toLowerCase().indexOf('пока') != -1 || msg.text.toLowerCase().indexOf('досвидания') != -1) {
        bot.sendMessage(chatId, 'До скорой всречи :)');
    } else if (msg.text.toLowerCase().indexOf('что делаешь') != -1 || msg.text.toLowerCase().indexOf('что ты делаешь') != -1) {
        bot.sendMessage(chatId, 'Общаюсь с вами, а заодно вычисляю ваш адрес');
    } else if (msg.text.toLowerCase().indexOf('спокойной ночи') != -1 || msg.text.toLowerCase().indexOf('хороших снов') != -1 || msg.text.toLowerCase().indexOf('доброй ночи') != -1) {
        if (msg.from.last_name == undefined) {
            bot.sendMessage(chatId, 'Спокойной ночи ' + msg.from.username + '! Хороших снов');
        } else {
            bot.sendMessage(chatId, 'Спокойной ночи ' + msg.from.first_name + '! Хороших снов');
        };
    };
    if (msg.text.toLowerCase().indexOf('музыка') != -1 || msg.text.toLowerCase().indexOf('музыку') != -1 || msg.text.toLowerCase().indexOf('музыки') != -1) {
        bot.sendMessage(chatId, "Обожаю");
        var audio = __dirname + '/music.mp3';
        bot.sendAudio(chatId, audio);
    }
    if (msg.text == 'Исследовать окрестности') {
        bot.sendMessage(chatId, "Вы видите шатёр!");
    } else if (msg.text == 'Исследовать замок') {
        bot.sendMessage(chatId, "Вас убили :(");
    };
    if (msg.text.toLowerCase().indexOf('да') != -1 & f == 1) {
        bot.sendMessage(chatId, "Отлично!");
        f = 0;
        game(chatId);
    } else if (msg.text.toLowerCase().indexOf('да') == -1 & f == 1) {
        bot.sendMessage(chatId, "Ну ладно, может в другой раз");
        f = 0;
    };
    if (msg.text.toLowerCase().indexOf('игра') != -1) {
        bot.sendMessage(chatId, "Хотите поиграть в игру?");
        f = 1;
    };
});

function game(chatId) {
    bot.sendMessage(chatId, "Начнём игру!");
    bot.sendMessage(chatId, "Ваш герой оказался около замка. Что ему делать: исследовать замок или исследовать окрестности?", {
        reply_markup: JSON.stringify({
            keyboard: [
                [{
                    text: "Исследовать окрестности",
                    callback_data: "147"
                }],
                [{
                    text: "Исследовать замок",
                    callback_data: "151"
                }]
            ]
        })
    });
};

var job = new cron('00 00 07 * * 0-6', function () {
    bot.sendMessage(chatId, "Это твой день, и сегодня тебя ничего не остановит!");
});
job.start();
