const Discord = require('discord.js');
exports.run = (bot, message, args) => {
  const { exec } = require("child_process"); // Kita gunakan module child_process untuk memanipulasi system process. jangan add di dependencies sudah terpasang!
  // Define sesuai dengan variable kalian.
     // Kita restrict penggunaan command exec karena ini berpengaruh sama seperti eval.
    exec(args.join(' '), (error, output) => { // 2 Parameter 1. String yg akan dieksekusi 2. callback
        if(!error){ // Jika ada tidak ada error
      
          message.channel.send(output, { code: 'bash'} )
        }
        return message.channel.send(error, { code: 'bash'}); //Maka defaultnya adalah kirim errornya
    });
  message.delete()
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ex", "exec"]
}

exports.help = {
  name: "exec",
  description: "exec",
  usage: "/ex"
}