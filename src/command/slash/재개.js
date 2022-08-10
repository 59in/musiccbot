const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
        .setName("재개")
        .setDescription("노래를 재개해요."),
    async execute(interaction, client, player) {
      if(!interaction.guild) return interaction.reply("서버에서만 사용할수 있습니다.")
      const nickname = interaction.member.nickname || interaction.member.user
        const queue = player.getQueue(interaction.guild.id);
        const paused = queue.setPaused(false);
          let pausedembed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("⏯️ 재개 ⏯️")
          .setDescription(`<a:o_:941623085788975206>\`${queue.current.title}\`(이)가 재개 되고 있습니다`)
            interaction.reply({ embeds: [pausedembed] })
    }
}