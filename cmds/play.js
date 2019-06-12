const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const Discord = require('discord.js')
const util = require('discord.js')
//const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('../config.json'); // 
const youtube = new YouTube(process.env.GOOGLE_API_KEY);
const queue = new Map();
  
exports.run = async (bot, message, args) => {
  const searchString = args.join(' ');
  const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
  const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

			if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return 
    let embed = new Discord.RichEmbed()
		     .setColor("RANDOM")
         .setTitle(`✅ **${playlist.title}** has been added to queue`)
         .setFooter(`Music Added by : ${message.author.tag}`);
      message.channel.send(embed);
      
    } else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          var selectembed = new Discord.RichEmbed()
 .setColor('RANDOM') 
 .setTitle('Song selection')
 .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`) 
 .setFooter('Please provide a value to select one of the search results ranging from 1-10') 
 
					message.channel.send(selectembed)
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11 && msg2.author.id === message.author.id, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
  async function handleVideo(video, message, voiceChannel, playlist = false) {
	var serverQueue = queue.get(message.guild.id);
	console.log(video);
	var song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`,
    //loop:false,
    durationh: video.duration.hours,
		durationm: video.duration.minutes,
		durations: video.duration.seconds,
    duration: video.duration,   mamang: message.member.voiceChannel.name, 
    meminta: message.author,
	};
	if (!serverQueue) {
		var queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 100,
			playing: true,
      loop: false
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		
   const embed = new Discord.RichEmbed()
           .setColor("RANDOM")
           .setTitle(`✅ ${song.title} has been added to queue`)
           .setFooter(`Song Added By : ${message.author.tag}`);
    return message.channel.send(embed)

	}
	return undefined;
}
  function play(guild, song) {
	var serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.'); //var endedembed = new Discord.RichEmbed()
      /*.setAuthor("Song Ended")
      .setColor("RANDOM")
      .addField("In :", `🎀 Server : \n${serverQueue.guild.name} \n(${serverQueue.guild.id})`)
      bot.channel.get("498411304139096064").send(endedembed);*/
			else console.log(reason);
      		const shiffed = serverQueue.songs.shift();
		if(serverQueue.loop) serverQueue.songs.push(shiffed);
		return play(guild, serverQueue.songs[0]);
		})
			/*serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})*/
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

var pleyembed = new Discord.RichEmbed() 

  .setColor('RANDOM')
  .setAuthor(`Start Playing`, `https://images-ext-1.discordapp.net/external/YwuJ9J-4k1AUUv7bj8OMqVQNz1XrJncu4j8q-o7Cw5M/http/icons.iconarchive.com/icons/dakirby309/simply-styled/256/YouTube-icon.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('Title', `__[${song.title}](${song.url})__`, true)
  .addField('Video ID', `${song.id}`, true)
  .addField("Volume", `${serverQueue.volume}%`, true)
  .addField("Duration", `${song.durationh} Hours ${song.durationm} Minutes ${song.durations} Seconds`, true)
  .addField('Voice Channel', `**${song.mamang}**`)
  .addField('Requested by', `${song.meminta}`)
  .setFooter("If you can't hear the music, please reconnect. If you still can't hear maybe the bot is restarting!")
  .setTimestamp();

	serverQueue.textChannel.send(pleyembed);
  
}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["p", "play"]
}

exports.help = {
  name: "play"
}