const { version } = require("discord.js");
const Discord = require('discord.js')
const moment = require("moment");
const config = require("../config.json")
require("moment-duration-format");

exports.run = (bot, message, args) => { // eslint-disable-line no-unused-vars

  const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  var embed = new Discord.RichEmbed()
  .setAuthor('STATISTICS')
  .setColor('BLUE')
  .setThumbnail(`${bot.user.displayAvatarURL}`)
  .setTimestamp()
  .setFooter(`Requested By ${message.author.tag}`)
  .addField('Owner', `<@511924685504643073>`)
  .addField('Bot ID', `${bot.user.id}`)
  .addField('Memory Usage', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`)
  .addField('Uptime', `${duration}`)
  .addField('Users', `${bot.guilds.size}`)
  .addField('Servers', `${bot.guilds.size}`)
  .addField('Channels', `${bot.channels.size}`)
  .addField('Libs', `Discord.js v${version}`)
  .addField('Engine', `Node ${process.version}`)
  .addField('Useful Links', "[Invite](https://discordapp.com/oauth2/authorize?&client_id=515196027590934529&scope=bot&permissions=8) ", false)
  message.channel.send(embed)
  message.delete()
}

exports.conf = { 
  enabled: true, 
  // not used yet 
  guildOnly: false, 
  // not used yet 
  aliases: ["status", "stats"]
}; 
exports.help = { 
  name : "status", 
  description: "Bot stats", 
  usage: "/stats" };
 