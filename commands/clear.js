const Discord = require('discord.js')


module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("У вас нет прав!");
if(!args[0]) return message.channel.send("oof.");
message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Удалено ${args[0]} сообщений.`).then(msg => message.delete(5000))
});


}

module.exports.help = {
    name: "clear"
}