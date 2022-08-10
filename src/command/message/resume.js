const Discord = require('discord.js')
const player = require('../../pleyer')

module.exports = {
    name: "재개",
    description: "노래를 재개해요.",
    async execute(message, args, client, track, interaction) {
        const queue = player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply('<a:x_:988403926288199731> 먼저 음성 채널에 가입하세요')
        const paused = queue.setPaused(false);
          let pausedembed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("⏯️ 재개 ⏯️")
          .setDescription(`<a:o_:988403926288199731>\`${queue.current.title}\`(이)가 재개 되고 있습니다`)
          .addField("요청자", `${message.author}`, true)
            message.channel.send({ embeds: [pausedembed] })
            console.log(`${message.author.tag}명령어 호출 - 재개`)
    }
}