exports.run = async (bot, message, args) => {
  if (message.author.id !== '513225288956641283') return message.channel.send('Gabisa :P')
  
    message.channel.send(args.join(" "))
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["spam"]
}

exports.help = {
  name: "say",
  description: ":v",
  usage: "/spam"
}