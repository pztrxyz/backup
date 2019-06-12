module.exports = (bot, message) => {
  // Ignore all bot
  
  if (message.content.startsWith('Halo')) {
    message.channel.send(`halo juga, ${message.author.username}`).then(msg => msg.delete(3000))
  }
  const { prefix, owner } = require('../config.json')
  if (message.author.bot) return;
  if (message.author.id !== owner) return;
  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(prefix) !== 0) return;
  // Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  let cmd;
  // Check if the command exists in Commands
  if (bot.commands.has(command)) {
    // Assign the command, if it exists in Commands
    cmd = bot.commands.get(command)
  // Check if the command exists in Aliases
  } else if (bot.aliases.has(command)) {
    // Assign the command, if it exists in Aliases
    cmd = bot.commands.get(bot.aliases.get(command));
  }

  if(cmd) {
    // Check user's perm level against the required level in the command // Run the `exports.run()` function defined in each command.
    cmd.run(bot, message, args);
  }

}