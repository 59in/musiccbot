const Discord = require('discord.js')
const player = require('../../pleyer')

module.exports = {
    name: "정지",
    description: "노래를 정지해요.",
    async execute(message, args, client, track) {
        const queue1 = player.getQueue(message.guild.id);
        if (!queue1 || !queue1.playing) return message.reply('재생되고 있는 노래가 없습니다');
        if (!message.member || !message.member.voice.channel) return message.reply('<a:x_:988403926288199731> 먼저 음성 채널에 가입하세요')
        if (queue1) queue1.destroy();
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("정지")
                    .setDescription("<a:o_:988403926288199731> 노래를 정지했어요")
                    .addField("요청자", `${message.author}`, true)
                ]
            })
        }
    }