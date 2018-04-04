var shell = require('shelljs')
var moment = require('moment')

var startTime = moment().format('LTS')
var hr = 0

var message = `You have been writing code for ${hr} hours \nSince : ${startTime}\n`
var title = `Code Warning`
function notify(){
    var notification = `terminal-notifier -message "${message}" -title "${title}" `
    // Run external tool synchronously
    if (shell.exec(notification).code !== 0) {
        shell.echo('Error: terminal-notifier missing!');
        shell.exit(1);
    }
    process.stdout.write(message);
}

notify()

setInterval( ()=>notify() , 3600000 )