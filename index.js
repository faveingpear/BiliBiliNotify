const Discord = require("discord.js");
const config = require("./config.json");
const Bibi = require("bili-api");

//const client = new Discord.Client();

//client.login(config.BOT_TOKEN); // Logs the bot in

class Streamer {
    constructor(newName,newId,newBibiLink){
        this.name = newName;
        this.id = newId;
        this.isLive = false;
        this.bibiLink = newBibiLink;
        this.prevLive = false;
    }

    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getLiveStatus(){
        return this.isLive;
    }
    getPrevLiveStatus(){
        return this.prevLive;
    }
    getBibiLink(){
        return this.bibiLink;
    }

    setName(newName){
        this.name = newName;
    }
    setId(newId){
        this.id = newId;
    }
    setLiveStatus(newStatus){
        this.isLive = newStatus;
    }
    setName(newName){
        this.name = newName;
    }
    setName(newName){
        this.name = newName;
    }

    checkIsLive(){
        (async () => {
            let status = await Bibi({ mid: this.id }, ['liveStatus']) // Gets live status from the bili-api
            if(status.liveStatus == 1 && this.prevStatus == false){ // If civia goes live
                this.notify();
                this.prevStatus = true;
            }else if(status.liveStatus == 0 && this.prevStatus == true){ // If civia goes offline
                this.prevStatus = false;
            }
            console.log("Civia live status " + status.liveStatus + " prev status " + this.prevStatus);
        })();
    }
}

Civia = new Streamer("Civia","34646754",false,"anything");
setInterval(function(){
    Civia.checkIsLive();
    console.log(Civia.getLiveStatus());
},10000);