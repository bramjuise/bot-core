const Discord = require('discord.js')
const strftime = require('strftime')

module.exports.run = async (bot, message, args) => {
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " день" : " дней") + " назад";
     };
     let verifLevels = ["Нет", "Слабая", "Средняя", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
     let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
     };
     const embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .addField("Имя", message.guild.name, true)
        .addField("ID", message.guild.id, true)
        .addField("Владелец", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField("Регион", region[message.guild.region], true)
        .addField("Всего | Людей | Боты", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
        .addField("Уровень безопасности", verifLevels[message.guild.verificationLevel], true)
        .addField("Каналов", message.guild.channels.size, true)
        .addField("Ролей", message.guild.roles.size, true)
        .addField("Дата создания", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
        .setThumbnail(message.guild.iconURL)
        message.channel.send({embed});
}

module.exports.help = {
    name: "serverinfo"
}