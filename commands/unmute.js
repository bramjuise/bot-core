const Discord = require('discord.js')
const fs = require('fs')
module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return errors.noPerms(message, "KICK_MEMBERS");
    
    let user = message.mentions.users.first();

    let iMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!iMember) return message.reply("Надо тегнуть пользователя");

  ///let muteRole = bot.guilds.get(message.guild.id).roles.find('name', 'muted');
  
  let sRole = message.guild.roles.find(`name`, `muted`)
  if(!sRole){
    try{
      sRole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  
  
  
  
  await(iMember.removeRole(sRole.id))

  message.channel.send(`***С пользователя ${iMember} снята заглушка!***`)
    
   
}

module.exports.help = {
    name: "unmute"
}