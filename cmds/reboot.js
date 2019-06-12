exports.run = (bot, message, args) => {
  message.channel.send("**Restarting...**")
  .then(msg => process.exit())
  .then(msg => message.channel.send('done'))
  message.delete()
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reboot', 'restart']
}

exports.help = {
  name: "reboot",
  description: "restart",
  usage: "/reboot"
}