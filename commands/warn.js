const Discord = require('discord.js')
const fs = require('fs')

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("У вас нет прав на это!");
    let user = message.mentions.users.first();
    if(!user) return message.channel.send('**Укажите пользователя**')
    let reason = args.slice(0).join(" ");
    if(!reason) return message.channel.send("Укажите причину");
   
    let logchannel = JSON.parse(fs.readFileSync('./logchannels.json', 'utf-8'))
    let incidentchannel = message.guild.channels.find(`name`, logchannel[message.guild.id].logchannel);
    if(!incidentchannel) return message.channel.send('Ней найден канал для логов')

    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'Предупреждение')
    .addField('Пользователь', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Модератор:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Причина', reason);

    user.send(`Вас предупредили на сервере **${message.guild}**, причина: **${reason}**`)
    message.channel.send(`Я предупредил пользователя **${user.username}**, причина: **${reason}**`)
    logchannel.send(embed)

}

module.exports.help = {
    name: "warn"
}