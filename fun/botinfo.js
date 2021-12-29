const Discord = require('discord.js')
const config = require('../config.json')

module.exports.run = async(bot, message, args) => {

    let bEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor('RANDOM')
    .addField('Имя Бота', bot.user.username)
    .addField('Версия Бота', config.vers)
    .addField('Залогинин на серверах (колличество)', bot.guilds.size)
    .addField('Bot ID', bot.user.id)
    .setTimestamp()

    message.channel.send(bEmbed)
}

module.exports.help = {
    name: "botinfo"
}