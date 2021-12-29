const Discord = require('discord.js')
const ms = require('ms')
const fs = require('fs')

module.exports.run = async (bot, message, args) => {
    let logchannel = JSON.parse(fs.readFileSync('./logchannels.json', 'utf-8'))
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Нельзя!");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Не найден пользователь");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Нельзя!");
    let reason = args.slice(2).join(" ");
    if(!reason) return message.reply("Укажите причину");
  
    let muterole = message.guild.roles.find(`name`, "muted");
    //start of create role
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
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
    //end of create role
    let mutetime = args[1];
    if(!mutetime) return message.reply("Вы не указали время");
  
    message.delete().catch(O_o=>{});
  
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField("Сервер:", message.guild.name)
    .addField("Модератор:", message.author.username)
    .addField("Был замьючен на:", mutetime)
    .addField("Причина", reason);

    try{
      await tomute.send(embed)
    }catch(e){
      message.channel.send(`*Пользователь был заглушен, на ${mutetime}, по причине: ${reason}*`)
    }
  
    let muteembed = new Discord.RichEmbed()
    .setDescription(`Модератор ${message.author}`)
    .setColor("#0000000")
    .addField("Пользователь", tomute)
    .addField("Было в канале:", message.channel)
    .addField("Сообщение было создано в", message.createdAt)
    .addField("Был замьючен на:", mutetime)
    .addField("Причина", reason);
  
    let channel = message.guild.channels.find(c => c.name === logchannel[message.guild.id].logchannel);
    if(!channel) return message.reply('Сначало создайте канал для логов!')
    channel.send(muteembed);
  
    await(tomute.addRole(muterole.id));
  
    setTimeout(function(){
      tomute.removeRole(muterole.id);
  }, ms(mutetime));
}

module.exports.help ={
    name:"tempmute"
}