const Discord = require('discord.js')
const superagent = require('superagent')

module.exports.run = async (bot, message, args) => {

let { body } =  await superagent
.get(`http://aws.random.cat//meow`)

let catE = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle("Ваш Коттэ")
.setImage(body.file)

message.channel.send(catE)

}

module.exports.help = {
    name: "cat"
}