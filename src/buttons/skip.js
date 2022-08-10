const player = require('../pleyer')
const { MessageEmbed } = require('discord.js')
module.exports = {
    id: "m_skip",
    async run(interaction) {
        const nickname = interaction.member.nickname || interaction.member.user
        const queue = player.getQueue(interaction.guild.id);
        if (!queue || !queue.playing) return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${interaction.user}\n<a:x_:988403926288199731> 재생되고 있는 노래가 없습니다`
                    )]
        })
        if (interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`${interaction.user}\n<a:x_:988403926288199731> 봇이 있는 음성 채널에 들어가 주십시오.`
                    )]
        })
        const currentTrack = queue.current;
        const success = queue.skip();
        return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("🔃 스킵 🔃")
                    .setDescription(`<a:o_:988403926288199731> \`${currentTrack}\` (을)를 건너뛰었어요!`)
            ]
        })
    },
};