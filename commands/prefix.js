const Discord = require('discord.js')
const fs = require('fs')
const mysql = require('mysql2')

const conn = mysql.createConnection({
  host:process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply("Вы не имеете прав на это!")

    let curr_pref = args[0];
    conn.query(
        'UPDATE prefixes SET prefix=? WHERE id=?',
        [args[0], message.guild.id],
        function(err, res, field) {
            console.log(res)
        }
    )

    console.log(message.guild.id)

    let eM = new Discord.RichEmbed()
    .setColor('#5BA444')
    .setTitle(`Успешно! Префикс сервера был изменен на \`${curr_pref}\` `)

    

    message.channel.send(eM)

}

module.exports.help = {
    name: "pref"
}