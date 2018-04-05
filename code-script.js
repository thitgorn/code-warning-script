var shell = require('shelljs')
var moment = require('moment')
const notifier = require('node-notifier');

var startTime = moment()
console.log("start coding at " + startTime.format('MMMM Do YYYY, h:mm:ss a'))

var title = `Code Warning`

var Time = {
    moreHour : () => {
        var id = setInterval( () =>{
            notify(false)
            clearInterval(id)
        } , 1000 * 60 * 60) // as hour
    } ,
    more10min : () => {
        var id = setInterval( () =>{
            notify(false)
            clearInterval(id)
        } , 1000 * 60 * 10) // as ten mins
    },
    customcodetime : (minute) => {
        var id = setInterval( () =>{
            notify(false)
            clearInterval(id)
        } , 1000 * 60 * parseInt(minute,10)) // as ten mins
    },
    takeabreak10min : () => {
        var breakTime = 600
        var id = setInterval( ()=> {
            var message = `"You have ${breakTime} seconds left."`
            shell.exec(`terminal-notifier -message ${message} -title 'Taking a break'`)
            breakTime = breakTime - 1
            if(breakTime==0) {
                clearInterval(id)
                notify(true)
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
                notify(true)
            }
        } , 1000) // as second
    } ,
    custombreaktime : (minute) => {
        var breakTime = parseInt(minute,10) * 60
        var id = setInterval( ()=> {
            var message = `"You have ${breakTime} seconds left."`
            shell.exec(`terminal-notifier -message ${message} -title 'Taking a break'`)
            breakTime = breakTime - 1
            if(breakTime==0) {
                clearInterval(id)
                notify(true)
            }
        } , 1000) // as second
    },
    stop : () => {
        // do nothing
    }
}

function notify(freeze){
    var now = moment()
    var duration = moment.duration(now.diff(startTime))
    var hrs = duration.asHours()
    hrs = hrs.toFixed(2)

    var message = `You have been coding for ${hrs} hours \nSince : ${startTime.format('LTS')}\n`
    var timeout = freeze ? "" : "-timeout 15"
    var answer = shell.exec(`alerter -appIcon /Users/thitiwat/Documents/code-script/code_icon.jpg -message "${message}" -title "${title}" -sound "Glass" -actions "Code more hour","Code more 10 minutes","take a break for 5 minutes","take a break for 10 minutes","custom code time","custom break time","STOP" -dropdownLabel "Options" -closeLabel "Dismiss" ${timeout}`)
    switch(answer.stdout) {
        case "Code more 10 minutes":
                Time.more10min()
                break
        case "take a break for 5 minutes":
                Time.takeabreak5min()
                break
        case "take a break for 10 minutes":
                Time.takeabreak10min()
                break
        case "custom code time":
                var anstime = shell.exec(`alerter -appIcon /Users/thitiwat/Documents/code-script/code_icon.jpg -message "How long you want to code (minute)?" -reply`)
                Time.customcodetime(anstime.stdout)
                break
        case "custom break time":
                var anstime = shell.exec(`alerter -appIcon /Users/thitiwat/Documents/code-script/code_icon.jpg -message "How long you want to break (minute)?" -reply`)
                Time.custombreaktime(anstime.stdout)
                break
        case "STOP":
                Time.stop()
                break
        default : 
                Time.moreHour()
    }
}

notify(false)

