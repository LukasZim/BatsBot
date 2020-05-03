const discord = require("discord.js");

module.exports.run = async(bot, message, args, options) => {
    var textMessage = "";
    if(!options || !options.active || !options.active.get(message.guild.id) || !options.active.get(message.guild.id).queue) return message.channel.send("Queue is empty!");
    for(i = 0; i < options.active.get(message.guild.id).queue.length; i++){
        textMessage = textMessage + (1 + i) + " : " + options.active.get(message.guild.id).queue[i].songTitle + "\n";
        if(i == 10 && options.active.get(message.guild.id).queue.length > 10){
            textMessage = textMessage + "there are " + (options.active.get(message.guild.id).queue.length - 10) + " more songs";
        }
    }
    message.channel.send(textMessage);
}

module.exports.help = {
    name: "hugoQueue"
}