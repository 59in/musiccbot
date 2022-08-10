const Discord = require('discord.js')
const player = require('../../pleyer')

module.exports = {
    name: "볼륨",
    description: "볼륨을 조절해요.",
    async execute(message, args, client) {
        const arg1 = args.join(' ')
        const queue = player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '먼저 음성 채널에 들어가주세요.' })

        if (!queue || !queue.playing) return message.reply({ content: '현재 재생되고 있는 음악이 없습니다.' })
        
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '봇이 있는 음성 채널에 들어가 주십시오.' })
        if ((arg1) < 0 || (arg1) > 300) return void message.reply({ content: "볼륨은 0~300까지만 조절 할 수 있습니다" });
        const success = queue.setVolume(arg1);
        console.log(`${message.author.tag}명령어 호출 - 볼륨`)
        console.log(`${message.author.tag} ${arg1}%`)

        return message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("AQUA")
                    .setTitle("🎧 볼륨 🎧")
                    .setDescription(`${arg1}%`)
                    .addField("요청자", `${message.author}`, true)
            ]
        })
    }
}