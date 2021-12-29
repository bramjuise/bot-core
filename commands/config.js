const Discord = require('discord.js')
const fs = require('fs')

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("У Вас нету на это прав!")
    let logchannel = JSON.parse(fs.readFileSync('./logchannels.json', 'utf-8'))

    logchannel[message.guild.id] = {
        logchannel: args[0]
    }
    if(!args[0]) return message.reply('Укажите название канала логов')
    fs.writeFileSync('./logchannels.json', JSON.stringify(logchannel), (err) => {
        if(err) console.log(err)
    })

    let eM = new Discord.RichEmbed()
    .setColor('#5BA444')
    .setTitle(`Успешно! Теперь канал логов  - \`${logchannel[message.guild.id].logchannel}\` `)

message.channel.send(eM)
}

module.exports.help = {
    name: "setlog"
}