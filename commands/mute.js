const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (bot, message, args) => {

    let logchannel = JSON.parse(fs.readFileSync('./logchannels.json', 'utf-8'))
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Нет")
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlog = bot.channels.find('name', logchannel[message.guild.id].logchannel);
    let muteRole = bot.guilds.get(message.guild.id).roles.find('name', 'muted');
    if (!modlog) return message.reply('Я не нашел канал для логов!').catch(console.error);
    if(!muteRole){
      try{
        muteRole = await message.guild.createRole({
          name: "muted",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muteRole, {
         
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
  }
    if (reason.length < 1) return message.reply('Вы должны указать причину для заглушки').catch(console.error);
    if (message.mentions.users.size < 1) return message.reply('Вы должны тегнуть пользователя.').catch(console.error);
    const embed = new Discord.RichEmbed()
    .setDescription(`Модератор ${message.author}`)
    .setColor("#0000000")
    .addField("Пользователь", user)
    .addField("Было в канале:", message.channel)
    .addField("Сообщение было создано в", message.createdAt)
    .addField("Причина", reason);
   
    if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('У меня нет прав на это.').catch(console.error);
  
    message.channel.send(`***Пользователь ${user.username} был заглушен по причине : ${reason}***`)
      message.guild.member(user).addRole(muteRole)
        bot.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    const muteEmb = new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField("Сервер:", message.guild.name)
    .addField("Модератор:", message.author.username)
    
    .addField("Причина", reason);
  user.send(muteEmb)
}

module.exports.help = {
    name: "mute"
}