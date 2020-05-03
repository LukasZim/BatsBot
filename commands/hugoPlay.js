const discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args, options) => {
    if (message.member.voice.channelID == null) return message.channel.send("Hugo wants to see you are in a channel uWu");

    //if (message.guild.me.voice.channelID) return message.channel.send("Hugo is already in another channel uWu xD LMAO\n:D:D:D:D:D");

    if (!args[0]) return message.channel.send("Hugo wants an URL UWUWUWUWUWUWUWUUWUWUWUWUW\nkill me");

    let validate = await ytdl.validateURL(args[0]);

    if (!validate) return message.channel.send("Hugo needs an valid URL UWUWUWUWUUWWUUWUWUUW\nend my suffering....\nplease.");

    let info = await ytdl.getInfo(args[0]);

    var data = options.active.get(message.guild.id) || {};

    if(!data.connection) data.connection = await message.member.voice.channel.join(); 

    if(!data.queue) data.queue = [];

    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        user: message.author.tag,
        url: args[0],
        channel: message.channel.id
    });

    if(!data.dispatcher){
        Play(bot, options, data);
    } else {
        message.channel.send(`Added to queue: ${info.title} \nAdded by : ${message.author.tag}`)
    }

    options.active.set(message.guild.id, data)

    // const dispatcher = connection.play(ytdl(args[0], { filter: 'audioonly' }));

    // dispatcher.setVolume(0.3);

    // dispatcher.on('finish', ()=>{
    //     console.log("im donzo");
    // });

    // message.channel.send(`Hugo is now playing with his nipples AND ${info.title}\nuwuwuwu`);
}

async function Play(bot, options, data){
    //bot.channels.get(data.queue[0].channel).send(`Now playing: ${data.queue[0].title}\nRequested by: ${data.queue[0].user}`)
    var options2 = { seek: 2, volume: 1, bitrate: 128000};

    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: "audioonly"}), options2);
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.on('finish', ()=>{
        Finish(bot, options, data.dispatcher);
    });
}

function Finish(bot, ops, dispatcher){

    var fetchedData = ops.active.get(dispatcher.guildID);

    fetchedData.queue.shift();

    if(fetchedData.queue.length > 0){
        ops.active.set(dispatcher.guildID, fetchedData);
        Play(bot, ops, fetchedData);
    } else {
        ops.active.delete(dispatcher.guildID);

        var voiceChannel = bot.guilds.cache.get(dispatcher.guildID).me.voice.channel;

        if(voiceChannel) voiceChannel.leave();
    }

}

module.exports.help = {
    name: "hugoPlay"
}

