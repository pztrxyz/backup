const Discord = require('discord.js');

exports.run = (bot, message, args) => {
  let diff = Date.now() - message.createdTimestamp
  message.channel.send(":ping_pong:** | PONG!!**")
  .then(msg => {
    setInterval(() => {
  var embed = new Discord.RichEmbed()
  .setAuthor("🏓 | Ping")
  .setColor("RED")
  .addField("Latency", "`" + `${diff}ms` + "`")
  msg.edit(embed)
}, 1500)
  })
  message.delete()
}

exports.conf = { 
  enabled: true, 
  // not used yet 
  guildOnly: false, 
  // not used yet 
  aliases: ["ping", "pong"],
}; 
exports.help = { 
  name : "ping", 
  description: "pong", 
  usage: "/ping" };
 