const Discord = require('discord.js');
const cat = require('random-puppy')

exports.run = async (bot, message, args) => {
  cat("cat")
  .then(url => {
    var embed = new Discord.RichEmbed()
    .setAuthor("Cat")
    .setImage(url)
    .setColor("RANDOM")
    message.channel.send(embed)
})
}
exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["cat"],
};

exports.help = {
  name : "cat",
  description: "Cute Cat Image",
  usage: "/cat"
};