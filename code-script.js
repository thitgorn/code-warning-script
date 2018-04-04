var shell = require('shelljs')
var moment = require('moment')
const notifier = require('node-notifier');

var startTime = moment()

var title = `Code Warning`

var Time = {
    moreHour : () => {
        var id = setInterval( () =>{
            notify()
            clearInterval(id)
        } , 1000 * 60 * 60) // as hour
    } ,
    more10min : () => {
        var id = setInterval( () =>{
            notify()
            clearInterval(id)
        } , 1000 * 60 * 10) // as ten mins
    },
    takeabreak10min : () => {
        var breakTime = 600
        var id = setInterval( ()=> {
            var message = `"You have ${breakTime} seconds left."`
            shell.exec(`terminal-notifier -message ${message} -title 'Taking a break'`)
            breakTime = breakTime - 1
            if(breakTime==0) {
                clearInterval(id)
                notify()
            }
        } , 1000) // as second
    } ,
    takeabreak5min : () => {
        var breakTime = 300
        var id = setInterval( ()=> {
            var message = `"You have ${breakTime} seconds left."`
            shell.exec(`terminal-notifier -message ${message} -title 'Taking a break'`)
            breakTime = breakTime - 1
            if(breakTime==0) {
                clearInterval(id)
                notify()
            }
        } , 1000) // as second
    } ,
    stop : () => {
        // do nothing
    }
}

function notify(){
    var now = moment()
    var duration = moment.duration(now.diff(startTime))
    var hrs = duration.asHours()
    if(hrs > 0) {
        hrs = 0
    }

    var message = `You have been coding for ${hrs} hours \nSince : ${startTime.format('LTS')}\n`

    var answer = shell.exec(`alerter -appIcon /Users/thitiwat/Documents/code-script/code_icon.jpg -message "${message}" -title "${title}" -actions "Code more hour","Code more 10 minutes","take a break for 5 minutes","take a break for 10 minutes","STOP" -dropdownLabel "Options" -closeLabel "Dismiss"`)
    switch(answer.stdout) {
        case "@CONTENTCLICKED":
                Time.moreHour()
                break
        case "Code more hour":
                Time.moreHour()
                break
        case "Code more 10 minutes":
                Time.more10min()
                break
        case "take a break for 5 minutes":
                Time.takeabreak5min()
                break
        case "take a break for 10 minutes":
                Time.takeabreak10min()
                break
        case "STOP":
                Time.stop()
                break
    }
}

notify()

