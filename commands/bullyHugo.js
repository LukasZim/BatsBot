const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var target = bot.guilds.cache.array()[0].members.cache.array().find(function (element) {
        return element.id == 321034764268077066;
    });
    target.setNickname(args.join(" "));
    return message.channel.send("Hugo's new nickname is: " + message.content.replace("bullyHugo ", ''));
}

module.exports.help = {
    name: "bullyHugo"
}

