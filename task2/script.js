

function sendMessage(message) {
    console.log(`Отправлено SMS "${message}"`)
}

const antifraud = function(originalFunction, timeInterval, attempts) {
    const TIME = timeInterval
    const ATTEMPTS = attempts
    const senders = []
    return function (ip, execTimestamp, message) {
        let sender = senders.find(element => {
            return element.ip === ip
        })
        if (sender === undefined) {
            senders.push({ip : ip, execTime : Date.now(), isBanned : false, attempts: ATTEMPTS})
            console.log('PUSH SENDERS', senders)
            sendMessage(message)
        }
        else {
            if (sender.isBanned) {
                console.log(`${ip} был забанен`)
            }
            else {
                if ( Date.now()  - sender.execTime < TIME*1000) {
                    sender.attempts -= 1
                    if (sender.attempts > 0) {
                        sender.execTime = Date.now()
                        sendMessage(message)
                    }
                    else {
                        sender.isBanned = true
                        console.log(`${ip} был забанен`)
                    }
                }
                else {
                    if (sender.attempts > 0) {
                        sender.execTime = Date.now()
                        sendMessage(message)
                    }
                    else {
                        sender.isBanned = true
                        console.log(`${ip} был забанен`)
                    }
                }
            }
        }
    }
}


const protectedFunction = antifraud(sendMessage, 3, 2)

setTimeout(() => {
    (protectedFunction('128.0.0.1', Date.now(), 'Первое сообщение')
    )}, 0)
setTimeout(() => {
    (protectedFunction('128.0.0.1', Date.now(), 'Второе сообщение')
    )}, 1000)
setTimeout(() => {
    (protectedFunction('128.0.0.1', Date.now(), 'Третье сообщение')
    )}, 2000)
setTimeout(() => {
    (protectedFunction('128.0.0.1', Date.now(), 'Четвертое сообщение')
    )}, 4000)


setTimeout(() => {
    (protectedFunction('192.168.1.1', Date.now(), 'Первое сообщение со второго IP')
    )}, 0)
setTimeout(() => {
    (protectedFunction('192.168.1.1', Date.now(), 'Второе сообщение со второго IP')
    )}, 4000)
setTimeout(() => {
    (protectedFunction('192.168.1.1', Date.now(), 'Третье сообщение со второго IP')
    )}, 8000)
setTimeout(() => {
    (protectedFunction('192.168.1.1', Date.now(), 'Четвертое сообщение со второго IP')
    )}, 9000)
setTimeout(() => {
    (protectedFunction('192.168.1.1', Date.now(), 'Пятое сообщение со второго IP')
    )}, 10000)
