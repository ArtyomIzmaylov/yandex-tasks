
class Sender {
    constructor(private ip : string, private execTime : number, private isBanned : boolean) {
    }
    getIp() {
        return this.ip
    }
}


class SenderCollection {
    private senderCollection : Sender[] = []

    addSender(sender : Sender) {
        this.senderCollection.push(sender)
    }

    findSender(ip : string) : Sender | undefined{
        return this.senderCollection.find((element) => {
            return element.getIp() === ip
        })
    }
    deleteSender(ip : string) {
        if (this.findSender(ip)) {
            this.senderCollection = this.senderCollection.filter((element) => {
                return element.getIp() !== ip
            })
        }
    }
    getCollection() {
        return this.senderCollection
    }
}

class SenderManager {
    constructor(private senderCollection : SenderCollection) {

    }
    updateSender(ip : string, isBanned : boolean = false) {
        this.senderCollection.deleteSender(ip)
        this.senderCollection.addSender(new Sender(
            ip, Date.now(), isBanned)
        )
    }
    banSender(ip : string) {
        this.updateSender(ip, true)
    }
}


const sender1 = new Sender('192.168.1.1', 5, false)
const sender2 = new Sender('192.168.0.1', 5, false)
const sender3 = new Sender('128.0.0.1', 10, false)

const senderCollection = new SenderCollection()

senderCollection.addSender(sender1)
senderCollection.addSender(sender2)
senderCollection.addSender(sender3)

const senderManager = new SenderManager(senderCollection)
senderManager.updateSender('192.168.1.1')
let log = senderCollection.getCollection()
console.log(log)
