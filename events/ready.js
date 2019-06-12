module.exports = (bot, ready) => {
  console.log(`Login As [${bot.user.tag}]`);

  setInterval(() => {
    const status = [
      "Develop By tr4sssh#1221"
    ]
    let random = Math.floor(Math.random() * status.length)
    bot.user.setPresence({ game: { name: status[random], type: "streaming", url: "https://www.twitch.tv/twitch"}})
    }, 5000)
}