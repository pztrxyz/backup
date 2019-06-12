const Discord = require("discord.js");
const { owner } = require('../config.json')
exports.run = async (bot, message, args) => {
  
    if (message.author.id !== owner) return
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Evaluate')
        .setColor("BLUE")
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        .setFooter('⏱️ | ' + (Date.now() - message.createdTimestamp).toLocaleString() + " ms")
        message.channel.send(embed)
    } catch(e) {
      let codein = args.join(" ")
      let time = (Date.now() - message.createdTimestamp).toLocaleString();
      var embedd = new Discord.RichEmbed()
      .setAuthor('Error Occurred')
      .setColor('RED')
      .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
      .addField(':interrobang: Error', `\`\`\`js\n${e}\n\`\`\``)
      .setFooter(`⏱️ | ${time}ms`)
        message.channel.send(embedd);
    }
  message.delete()
}

exports.conf = { 
  enabled: true, 
  // not used yet 
  guildOnly: false, 
  // not used yet 
  aliases: ["e", "eval"]
}; 
exports.help = { 
  name : "eval", 
  description: "Eval Some Object", 
  usage: "/eval" 
};
 

