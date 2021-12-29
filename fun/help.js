const Discord = require('discord.js')
const fs = require('fs')

module.exports.run = async (bot, message, args) => {

    let prefixes = JSON.parse(fs.readFileSync('./prefix.json', 'utf-8'))

    const hEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Комманды бота ' + bot.user.username)
    .setDescription("<> - обязательные параметры, {} - не обязательные параметры")
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField(`${prefixes[message.guild.id].prefixes}pref <новый префикс>`, 'Изменить префикс бота на сервере')
    .addField(`${prefixes[message.guild.id].prefixes}setlog <название канала>`, 'Установить канал для логов бота')
    .addField(`${prefixes[message.guild.id].prefixes}ban <пользователь> {причина}`, 'Забанить пользователя')
    .addField(`${prefixes[message.guild.id].prefixes}unban <id пользователя>`, 'Разбанить пользователя')
    .addField(`${prefixes[message.guild.id].prefixes}kick <пользователь> {причина}`, 'Кикнуть пользователя')
    .addField(`${prefixes[message.guild.id].prefixes}clear <количество сообщений>`, 'Очистить сообщения')
    .addField(`${prefixes[message.guild.id].prefixes}mute <user> {причина}`, 'Замутить пользователя')
    .addField(`${prefixes[message.guild.id].prefixes}tempmute <user> <время> {причина}`, 'Замутить пользователя на время')
    .addField(`${prefixes[message.guild.id].prefixes}unmute <user>`, 'Размутить пользователя')
    .addField(`${prefixes[message.guild.id].prefixes}warn <user> <причина>`, 'Предупредить')
    .addField(`${prefixes[message.guild.id].prefixes}cat`, 'Рандомное изображение с котом')
    .addField(`${prefixes[message.guild.id].prefixes}dog`, 'Рандомное изображение с песиком')
    .addField(`${prefixes[message.guild.id].prefixes}userinfo {пользователь}`, 'Информация о пользователе')
    .addField(`${prefixes[message.guild.id].prefixes}serverinfo`, 'Информация о сервере')
    .addField(`${prefixes[message.guild.id].prefixes}botinfo`, 'Информация о боте')
    .addField(`${prefixes[message.guild.id].prefixes}ping`, 'Узнать пинг')
    .addField(`${prefixes[message.guild.id].prefixes}invite`, "Приглашение на бота")
    .setTimestamp()

    message.channel.send(hEmbed)
}

module.exports.help = {
    name: "help"
}