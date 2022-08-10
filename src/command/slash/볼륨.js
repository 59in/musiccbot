const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("볼륨")
        .setDescription("노래 볼륨을 설정해요.")
        .addStringOption(options => options
            .setName("볼륨")
            .setDescription("설정할 볼륨을 적어주세요")
            .setRequired(true)
        ),
    async execute(interaction, client, player) {
        if(!interaction.guild) return interaction.reply("서버에서만 사용할수 있습니다.")
        const nickname = interaction.member.nickname || interaction.member.user
        const arg1 = interaction.options.getString("볼륨")
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: '현재 재생되고 있는 음악이 없습니다.' })
        
        if ((arg1) < 0 || (arg1) > 300) return void interaction.reply({ content: "볼륨은 0~300까지만 조절 할 수 있습니다" });
        const success = queue.setVolume(arg1);

        return interaction.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("AQUA")
                    .setTitle("🎧 볼륨 🎧")
                    .setDescription(`${arg1}%`)
            ]
        })
    }
}