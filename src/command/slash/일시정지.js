const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    // name: "일시정지",
    // description: "노래를 일시정지해요.",
    data: new SlashCommandBuilder()
        .setName("일시정지")
        .setDescription("노래를 일시정지해요."),
    async execute(interaction, client, player) {
      if(!interaction.guild) return interaction.reply("서버에서만 사용할수 있습니다.")
      const nickname = interaction.member.nickname || interaction.member.user
        const queue = player.getQueue(interaction.guild.id);
        if (!queue || !queue.playing) return interaction.reply('<a:x_:988403926288199731> 재생되고 있는 노래가 없습니다');
        const paused = queue.setPaused(true);
          let pausedembed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("⏸️ 일시정지 ⏸️")
          .setDescription(`<a:o_:988403926288199731>\`${queue.current.title}\`(이)가 일시정지 되었습니다`)
            interaction.reply({ embeds: [pausedembed] })
    }
}