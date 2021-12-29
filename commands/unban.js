const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (bot, message, args) => {
     
    let user = args[0];

    if(!message.member.hasPermission('BAN_MEMBERS')) return errors.noPerms(message, "KICK_MEMBERS");
    
    if(!user) return message.reply('Укажите id пользователя!').catch(console.error);
    message.guild.unban(user);
    let logchannel = JSON.parse(fs.readFileSync('./logchannels.json', 'utf-8'))
    let incidentchannel = message.guild.channels.find(`name`, logchannel[message.guild.id].logchannel);
    if(!incidentchannel) return message.channel.send("Не найден logs канал");

    message.reply(`С пользователя сняли бан!`);
}

module.exports.help = {
name: "unban"
}