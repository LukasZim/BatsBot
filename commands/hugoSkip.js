const discord = require("discord.js");

module.exports.run = async(bot, message, args, options) => {
    if(!options || !options.active || !options.active.get(message.guild.id) || !options.active.get(message.guild.id).queue) return message.channel.send("Queue is empty!");


    var data = options.active.get(message.guild.id);
    var queue = data.queue;
    if(!data.dispatcher) return message.channel.send("No song playing");
    if(!(message.member.voice.channel.id == bot.guilds.cache.get(data.dispatcher.guildID).me.voice.channel.id)) return message.channel.send("Not in my channel");
    data.dispatcher.end();
}

module.exports.help = {
    name: "hugoSkip"
}