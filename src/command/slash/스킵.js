const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("스킵")
        .setDescription("노래를 스킵해요."),
    async execute(interaction, client, player){
        if(!interaction.guild) return interaction.reply("서버에서만 사용할수 있습니다.")
        const nickname = interaction.member.nickname || interaction.member.user
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: '<a:x_:988403926288199731> 현재 재생되고 있는 음악이 없습니다.' })

        const currentTrack = queue.current;
        const success = queue.skip();

        return interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("🔃 스킵 🔃")
                    .setDescription(`<a:o_:988403926288199731> \`${currentTrack}\` (을)를 건너뛰었어요!`)
            ]
        });
    }
}