const Discord = require('discord.js')

exports.run = (bot, message, args) => {
  const user = bot.users.get(args[0]) || message.mentions.users.first() 
  if (!user) {
    var embedself = new Discord.RichEmbed()
    .setAuthor("avatar", `${message.author.displayAvatarURL}`)
    .setImage(message.author.displayAvatarURL)
    message.channel.send(embedself)
  }
  else {
    var embed = new Discord.RichEmbed()
    .setAuthor(`${user.username} Avatar`, `${user.displayAvatarURL}`)
    .setImage(user.displayAvatarURL)
    message.channel.send(embed)
}
  message.delete()
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["avatar"]
}

exports.help = {
  name: "avatar"
}