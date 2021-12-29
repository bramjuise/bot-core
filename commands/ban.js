const Discord = require('discord.js')
const fs = require('fs') 

module.exports.run = async (bot, message, args) => {
    let logchannel = JSON.parse(fs.readFileSync('./logchannels.json', 'utf-8'))
    let incidentchannel = message.guild.channels.find(`name`, logchannel[message.guild.id].logchannel);
    let reason = args.slice(1).join(' ')
    let user = message.mentions.users.first();
   
    if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");

    if(message.mentions.users.size < 1) return message.reply('Вы должны упомянуть кого-то').catch(console.error);
    
    if(!incidentchannel) return message.channel.send("Не найден канал для логов!.");
    if(reason < 1) reason = "Причина не указана"

    if(!message.guild.member(user).bannable) return message.reply("Нет.");
    message.guild.ban(user, 2);


    const banw = new Discord.RichEmbed()
    .setDescription("Function")
    .setColor('RANDOM')
    .setTimestamp()
    .addField("Action", "Бан")
    .addField("Пользователь:", `${user.username}#${message.author.discriminator}`)
    .addField("Модератор", `${message.author.username}#${message.author.discriminator}`)
    .addField("ID:", `${user.id}`)
    .addField('Причина', reason)

    message.channel.send(`Пользователь ${user.username} забанен.`)
  user.send(`Вас забанили на сервере ${message.guild.name}, причина: ${reason}.`)
    return incidentchannel.send(banw);
    

}

module.exports.help = {
    name: "ban"
}