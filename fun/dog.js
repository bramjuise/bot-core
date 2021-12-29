const Discord = require('discord.js')
const superagent = require('superagent')

module.exports.run = async (bot, message, args) => {

let { body } =  await superagent
.get(`https://random.dog/woof.json`)

let catE = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle("Ваш Песик")
.setImage(body.url)

message.channel.send(catE)

}

module.exports.help = {
    name: "dog"
}