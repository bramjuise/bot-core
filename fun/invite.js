const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    await(message.delete(5000))
    let aut = message.author
    let emb = new Discord.RichEmbed()
    .setDescription('https://discordapp.com/oauth2/authorize?client_id=662232841190637578&scope=bot&permissions=8')
    .setColor('RANDOM')

    aut.send(emb)
    message.channel.send("**Проверьте ЛС.**")
}

module.exports.help = {
    name: "invite"
}