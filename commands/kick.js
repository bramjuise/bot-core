const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (bot, message, args) => {

    
  let logchannel = JSON.parse(fs.readFileSync('./logchannels.json', 'utf-8'))
  let incidentchannel = message.guild.channels.find(`name`, logchannel[message.guild.id].logchannel);
    let reason = args.slice(1).join(' ');
    if(reason < 1) reason = "причина не указана"
    let user = message.mentions.users.first();
    if(!user) return message.reply("Укажите пользователя.")
    if(!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
    
    if(!incidentchannel) return message.channel.send("Не найден logs канал.");
    if (message.mentions.users.size < 1) return message.reply('Вы должны упомянуть кого-то').catch(console.error);
  
    if (!message.guild.member(user).kickable) return message.reply('Я не могу кикнуть его');
    message.guild.member(user).kick();
  
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Action:', 'Кик')
      .addField('Пользователь', `${user.username}#${user.discriminator} (${user.id})`)
      .addField('Модератор:', `${message.author.username}#${message.author.discriminator}`)
      .addField('Причина', reason);

      user.send(`Вас кикнули с **${message.guild.name}**, причина : ${reason}`)
      const msg = await message.channel.send("Kick function");
      msg.edit(`***Я изгнал пользователя!***`);
 
    return bot.channels.get(incidentchannel.id).sendEmbed(embed);
    

}

module.exports.help = {
    name: "kick"
}