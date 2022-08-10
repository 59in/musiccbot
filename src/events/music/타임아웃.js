const client = require('../../../index')
const player = require('../../pleyer')
client.on('voiceStateUpdate', async (queue, oldState) => {
    setTimeout(async () => {
        const queue = await player.getQueue(oldState.guild.id)

        if (!queue) return

        if (oldState.channel?.id !== queue.connection.channel.id) return

        if (oldState.channel?.members.size && oldState.channel?.members.size < 2) {
            const Discord = require('discord.js')
            const voice = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("음성채널이 일정시간동안 비어 플레이어를 종료했어요!")
                .setTimestamp()
            queue.metadata.send({ embeds: [voice] }).then(msg => { setTimeout(() => { msg.delete() }, 5000); })
            await queue.destroy()
        }
    }, 15 * 1000)
})