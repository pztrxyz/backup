exports.run = async (bot, message,args) => {
    if (!message.member.voiceChannel) { return message.channel.send("You are not in my voice channel! Come in and tell me face to face!"); }
  
    message.member.voiceChannel.leave();
    return message.channel.send(`I have left <#${message.member.voiceChannelID}>.`);
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["dc" , "leave"]
}

exports.help = {
  name: "leave",
  description: "bla",
  usage: "/dc"
}