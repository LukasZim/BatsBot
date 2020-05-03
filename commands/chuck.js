const discord = require("discord.js");
const Chuck = require('chucknorris-io'),
    client = new Chuck();

module.exports.run = async(bot, message, args) => {
    client.getRandomJoke().then(function (response){
        console.log(response);
        message.channel.send(response.value);
    })  .catch(function(error){
        console.log(error);
    })  
}

module.exports.help = {
    name: "chuck"
}