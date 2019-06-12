const meme = require('random-puppy')
const { RichEmbed } = require('discord.js')

exports.run = async (bot, message, args) => {
  meme('meme')
  .then(url => {
  var embed = new RichEmbed()
  .setAuthor("Meme")
  .setImage(url)
  .setColor("RANDOM")
  message.channel.send(embed)
  message.delete()
})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["meme"]
}

exports.help = {
  name: "meme",
  description: "xd",
  usage: "/meme"
}