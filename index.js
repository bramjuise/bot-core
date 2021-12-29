const Discord = require('discord.js')
const bot = new Discord.Client({disableEveryone: true})
const config = require('./config.json')
const fs = require("fs")
bot.commands = new Discord.Collection()
const token = process.env.token
const moment = require('moment')
let now = moment().format("HH:mm")
const SDC = require('@megavasiliy007/sdc-api')
const client = new SDC('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjIzMjg0MTE5MDYzNzU3OCIsInBlcm1zIjowLCJpYXQiOjE1NzgzOTQ5MzV9.8-Z5jV2OhWvCqJoHjEfcjw8VtmxAQvd6AkMQ-gNq37A')

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
  
    let prefixes = JSON.parse(fs.readFileSync('./prefix.json', 'utf-8'))
    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: config.prefix
      };
    }

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  let commandFile = bot.commands.get(cmd.slice(prefix.length))
  if (commandFile) commandFile.run(bot, message, args)

  var options = {
    servers: bot.guilds.size,
    shards: bot.shards.size
};

client.botStats("662232841190637578", options)
    .then((data) => {
        console.log(data.status); // Вернёт "true", если всё успешно
    });
  })

bot.login(token)