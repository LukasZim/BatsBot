const discord = require("discord.js");
const packageStuff = require("../package.json");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {
    console.log(packageStuff);
}

module.exports.help = {
    name: "source"
}