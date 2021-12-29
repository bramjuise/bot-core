const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true})
const config = require('./config.json')
const fs = require("fs")
bot.commands = new Discord.Collection()
const moment = require('moment')
let now = moment().format("HH:mm")
require('dotenv').config()
const token = process.env.token
const mysql = require('mysql2')
const { Console } = require('console')

const conn = mysql.createConnection({
  host:process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

bot.on("ready", () => {
    bot.user.setPresence({
        game: { 
            name: '.help для помощи',
            type: 'PLAYING'
        },
        status: "online"
    })
    console.log(now + ` Бот онлайн! Залогинин на ${bot.guilds.size} серверах.`)
  });

  bot.on('guildCreate', guild => {
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`**Привет! Я - Чамп бот. Для начала работы со мной: \nПропишите \`${prefixes[message.guild.id].prefixes}setlog <название канала логов> для установки логов модерации!\` и выполните все требования. \n \n Вечная ссылка на сервер бота - https://discord.gg/ZbuUbBz \n \nПриятного пользования!**`)
    .setTimestamp()
    guild.owner.send(embed)
    
  console.log(now + " Я присоединился к серверу - " + guild.name)
  })
  bot.on('guildDelete', guild => {

    console.log(now + "Я ушел с сервера - " + guild.name)
  })
  



  fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){

        console.log(`${f} : ❌`);
        return;
    } 

    jsfile.forEach((f, i) => {
        
        let props = require(`./commands/${f}`)
        console.log(`${now} : ${f} : ✔`)
        bot.commands.set(props.help.name, props)
    })
    console.log('--------------')
})

fs.readdir("./fun/", (err, files) => {
  if(err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){

      console.log(`${f} : ❌`);
      return;
  } 

  jsfile.forEach((f, i) => {
      
      let props = require(`./fun/${f}`)
      console.log(now + `: ${f} : ✔`)
      bot.commands.set(props.help.name, props)
  })
  console.log('--------------')
})

  bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    var prefix;
  
    conn.query('SELECT * FROM prefixes WHERE id=?', [message.guild.id], function (err, res, fetch){
      if(res.length == 0){
        conn.query('INSERT INTO prefixes (id, prefix) VALUES (?,?)', [message.guild.id, process.env.prefix])
        prefix = `${process.env.prefix}`
        console.log(prefix)
      } else {
        prefix = res[0].prefix
        console.log(prefix)
      }
    })


    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
  let commandFile = bot.commands.get(cmd.slice(1))
  if (commandFile) commandFile.run(bot, message, args)



  })

bot.login(token)