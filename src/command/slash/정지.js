const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("정지")
        .setDescription("노래를 정지해요."),
    async execute(interaction, client, player) {
        if(!interaction.guild) return interaction.reply("서버에서만 사용할수 있습니다.")
        const nickname = interaction.member.nickname || interaction.member.user
        const queue1 = player.getQueue(interaction.guild.id);
        if (!queue1 || !queue1.playing) return interaction.reply('재생되고 있는 노래가 없습니다');
        if (queue1) queue1.destroy();

        interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("정지")
                    .setDescription("<a:o_:988403926288199731> 노래를 정지했어요")
                ]
            })
        }
    }