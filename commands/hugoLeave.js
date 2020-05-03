module.exports.run = async(bot, message, args) => {
    if(!message.member.voice.channel) return message.channel.send("You aren't connected, so you can't play with me");

    if(!message.guild.me.voice.channel) return message.channel.send("Im not connected, please eat from me\n UWUWUW xd xD");

    if(message.guild.me.voice.channelID != message.member.voice.channelID) return message.channel.send("You aren't connected, so you can't play with me");

    message.guild.me.voice.channel.leave();

    message.channel.send("Later bitch");
}

module.exports.help = {
    name: "hugoLeave"
}