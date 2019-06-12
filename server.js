const uptime = require('./uptime.js');

const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json")
bot.config = config;
// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return bot.channel.get('528178267883307008').send(err)
  files.forEach(file => {
    // If the file is not a JS file, ignore it (thanks, Apple)
    if (!file.endsWith(".js")) return;
    // Load the event file itself
    const event = require(`./events/${file}`);
    // Get just the event name from the file name
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    // without going into too many details, this means each event will be called with the client argument,
    // followed by its "normal" arguments, like message, member, etc etc.
    // This line is awesome by the way. Just sayin'.
    bot.on(eventName, event.bind(null, bot));

  });
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
// Load the contents of the `/cmd/` folder and each file in it.
fs.readdir(`./cmds/`, (err, files) => {
  if(err) console.error(err);
  console.log(`Loading a total of ${files.length} commands.`);
  // Loops through each file in that folder
  files.forEach(f=> {
    // require the file itself in memory
    let props = require(`./cmds/${f}`);
    console.log(`Loading Command: ${props.help.name}. :ok_hand:`);
    // add the command to the Commands Collection
    bot.commands.set(props.help.name, props);
    // Loops through each Alias in that command
    props.conf.aliases.forEach(alias => {
      // add the alias to the Aliases Collection
      bot.aliases.set(alias, props.help.name);
    });
  });
});
bot.login(process.env.token)