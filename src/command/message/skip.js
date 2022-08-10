const Discord = require('discord.js')
const player = require('../../pleyer')

module.exports = {
    name: "스킵",
    description: "노래를 스킵해요.",
    async execute(message, args, client){
        const queue = player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '<a:x_:988403926288199731> 먼저 음성 채널에 들어가주세요.' })

        if (!queue || !queue.playing) return message.reply({ content: '<a:x_:988403926288199731> 현재 재생되고 있는 음악이 없습니다.' })

        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '<a:x_:941623055703236639> 봇이 있는 음성 채널에 들어가 주십시오.' })
        const currentTrack = queue.current;
        const success = queue.skip();
        console.log(`명령어 호출 - 스킵 ${message.author.tag} - ${currentTrack}`)

        return message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("🔃 스킵 🔃")
                    .setDescription(`<a:o_:988403926288199731> \`${currentTrack}\` (을)를 건너뛰었어요!`)
                    .addField("요청자", `${message.author}`, true)
            ]
        });
    }
}