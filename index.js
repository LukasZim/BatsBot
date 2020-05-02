const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const active = new Map();

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("welke files denk jij hier te vinden?");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);
    });
});





bot.once("ready", () => {
    console.log("Im ready to ruuuuumbleeeeeeeeeeeee");
});

bot.once("reconnecting", () => {
    console.log("Im reconnecting, valve pls fix");
});

bot.once("disconnect", () => {
    console.log("Aaaaaaaaaaaand im gone...");
})




bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("with Hugo's Nipples", { type: "PLAYING" });
});


bot.on("message", async message => {
    if (message.author.bot) return;
    if (channelIdChecker(message.channel.id)) return; //disabled in general
    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    //console.log(message.content);
    var arguments = messageArray.slice(1);
    var commands = bot.commands.get(command);

    var options = {
        active: active
    }

    if (message.author.id == 321034764268077066) {
        message.channel.send("goedenmorgen alterego, ZIJN.WE.ER.KLAAR.VOOR>?\nAJAJ KAPITIJN");
    }
    if (commands) {
        commands.run(bot, message, arguments, options);
    } else {
        //als de message "hugo" bevat, stuur iets irritants
        if (message.content.toLowerCase().includes("hugo"))
            return message.channel.send("LOOOOOOOOOL, DAT BEN IK \nIK.BEN.LETTERLIJK.HUGO.WTF.LOOOOOOL.XDXD.LMAO!!!!");
        if (message.content.toLowerCase().includes("gay")) {
            return message.channel.send("( ͡° ͜ʖ ͡°)");
        } 
    }
});



function channelIdChecker(id) {
    if (id == 454340635374387234) return true;
    if (id == 476181464057118742) return true;
    if (id == 695744351833423903) return true;
    if (id == 601414098214846465) return true;

    return false;
}

bot.login(process.env.token);