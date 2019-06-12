const Discord = require('discord.js')

exports.run = (bot, message, args) => {
  if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
  const command = args[0];
  // Check if the command exists and is valid
  if(!bot.commands.has(command)) {
    return message.channel.send("That command does not exist");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${command}.js`)];
  // We also ed to delete and reload the command from the client.commands Enmap
  bot.commands.delete(command);
  const props = require(`./${command}.js`);
  bot.commands.set(props.help.name, props);
  var embed = new Discord.RichEmbed()
  .setTitle('Reload Command')
  .setColor('RANDOM')
  .addField('Command Name', '```' + `${command}` + '```')
  .addField('Result', '```' + 'Command Has Been Reloaded' + '```');
  message.channel.send(embed)
  .then(msg => {
    msg.delete(10000);
  })
  message.delete()
};

exports.conf = { 
  enabled: true, 
  // not used yet 
  guildOnly: false, 
  // not used yet 
  aliases: ["r", "reload"]
}; 
exports.help = { 
  name : "reload", 
  description: "Reload command", 
  usage: "/reload" };
 