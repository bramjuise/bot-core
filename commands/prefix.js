const Discord = require('discord.js')
const fs = require('fs')

module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("Вы не имеете прав на это!")

    let prefixes = JSON.parse(fs.readFileSync('./prefix.json', 'utf-8'))
    prefixes[message.guild.id] = {
        prefixes: args[0]
    }
    if(!args[0]) return message.reply('Укажите префикс')
    fs.writeFileSync('./prefix.json', JSON.stringify(prefixes), (err) => {
        if(err) console.log(err)
    })

    let eM = new Discord.RichEmbed()
    .setColor('#5BA444')
    .setTitle(`Успешно! Префикс сервера был изменен на \`${prefixes[message.guild.id].prefixes}\` `)

    

    message.channel.send(eM)

    let dev_channel = bot.channels.get('664081160795848724')

    let dev_E = new Discord.RichEmbed()
    .setColor('#5BA444')
    .setTitle(`На сервере **${message.guild.name}**, ID ${message.guild.id}, Префикс сервера был изменен на \`${prefixes[message.guild.id].prefixes}\` `)

    dev_channel.send(dev_E)

}

module.exports.help = {
    name: "pref"
}