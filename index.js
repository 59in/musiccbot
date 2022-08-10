//메인
const { Client, Collection, MessageEmbed } = require('discord.js')
const client = new Client({ intents: 32767 })
const { token, mongo_url, prefix } = require('./config.json')
client.login(token)
module.exports = client;

//모듈
const fs = require('fs')
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const player = require('./src/pleyer')

//DB
const mongoose = require("mongoose")
mongoose.connect(mongo_url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(console.log("✅ | 데이터베이스 연결 완료"))


const commands = []
client.slashcommands = new Collection()
const commandfolder = fs.readdirSync(`./src/command/slash/`).filter(file => file.endsWith(".js"))
for (const file of commandfolder) {
    const command = require(`./src/command/slash/${file}`)
    commands.push(command.data.toJSON());
    client.slashcommands.set(command.data.name, command)
}
const rest = new REST({ version: '9' }).setToken(token)
client.on("interactionCreate", async interaction => {
    if (!interaction.guild) return;
    if (!interaction.isCommand() || interaction.isContextMenu) {
        const command = client.slashcommands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction, client, player)
        } catch (err) {
            console.error(err)
        }
    }
})
client.once('ready', async () => {
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands }
        )
    } catch (e) {
        console.error(e)
    }
})

process.on('uncaughtException', (err) => {
    console.error(err);
});
process.on("unhandledRejection", err => {
    console.error(err)
})

//메세지 커맨드 핸들
client.commands = new Collection()
const commandsFile = fs.readdirSync(`./src/command/message/`).filter(file => file.endsWith('.js'))
for (const file of commandsFile) {
    const command = require(`./src/command/message/${file}`)
    client.commands.set(command.name, command)
}
client.on('messageCreate', async message => {
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try {
        await command.execute(message, args, client)
    } catch (err) {
        console.error(err)
        message.channel.send({ content: "오류가 발생했습니다" })
    }
})

//이벤트 핸들
fs.readdirSync(`./src/events`).forEach(dirs3 => {
    const eventFiles = fs.readdirSync(`./src/events/${dirs3}/`).filter(file => file.endsWith('.js'));

    eventFiles.forEach(file => {
        const event = require(`./src/events/${dirs3}/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.run(...args));
        } else {
            client.on(event.name, async (...args) => await event.run(...args));
        }
    })
})

//버튼 핸들
client.buttonCommands = new Collection()
const buttonsCommands = fs.readdirSync("./src/buttons");

for (const commandFile of buttonsCommands) {
    const command = require(`./src/buttons/${commandFile}`);
    client.buttonCommands.set(command.id, command);
}

//최종가동
client.on('ready', async () => {
    console.log(`✅ | ${client.user.tag}가동완료`);
})