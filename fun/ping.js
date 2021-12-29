const Discord = require('discord.js')
const ms = require('ms')

module.exports.run = async (bot, message, args) => {

    message.channel.sendMessage('Твой пинг -  `' + `${Date.now() - message.createdTimestamp}` + ' ms`')

}

module.exports.help = {
    name: "ping"
}