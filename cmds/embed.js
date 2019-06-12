const Discord = require('discord.js');
exports.run = (bot, message, args) => {
  let content = args.slice(1).join(" ")
  var embed = new Discord.RichEmbed()
  .setColor("#" + args[0])
  .setDescription(content)
  message.channel.send(embed)
  message.delete()
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["em", "embed"]
}

exports.help = {
  name: "embed",
  description: "use embed",
  usage: "]embed"
}