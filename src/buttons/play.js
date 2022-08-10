const player = require('../pleyer')
const { MessageEmbed } = require('discord.js')
module.exports = {
    id: "m_play",
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
        const paused = queue.setPaused(false);
        let pausedembed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("⏯️ 재개 ⏯️")
            .setDescription(`<a:o_:988403926288199731>\`${queue.current.title}\`(이)가 재개 되고 있습니다`)
        interaction.reply({ embeds: [pausedembed] })
    },
};