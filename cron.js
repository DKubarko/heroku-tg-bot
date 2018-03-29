var cron = require('cron').CronJob;
new cron('* * * * * *', function () {
    console.log("Привет!");
});
