const Discord = require('discord.js');
const randomPuppy = require('random-puppy')

exports.run = async(bot, message, args) => {
  if(message.author.bot) return;
  randomPuppy('dog')
            .then(url => {
                const embed = new Discord.RichEmbed()
                
                .setAuthor(`Dog`)
                .setImage(url)
                .setColor("RANDOM")
    return message.channel.send({ embed });
            })
}
exports.conf = {
  aliases: ["dog"]
}
exports.help = {
	name: "dog"
}