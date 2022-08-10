const player = require('../pleyer')
const { MessageEmbed } = require('discord.js')
module.exports = {
  id: "m_repeat",
  async run(interaction) {
    const queue = player.getQueue(interaction.guild.id)
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
    if (queue.repeatMode === 0) {
      queue.setRepeatMode(1)
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('🔁 반복재생 🔁')
        .setDescription(`<a:o_:988403926288199731> 현제 재생중인 노래를 반복합니다.`)
        .addField("요청자", `${interaction.member.user}`, true)
      interaction.reply({ embeds: [embed] })
    } else if (queue.repeatMode === 1) {
      queue.setRepeatMode(2)
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('🔁 반복재생 🔁')
        .setDescription(`<a:o_:988403926288199731> 모든 노래가 반복재생 됩니다.`)
        .addField("요청자", `${interaction.member.user}`, true)
      interaction.reply({ embeds: [embed] })
    } else if (queue.repeatMode === 2) {
      queue.setRepeatMode(0)
      const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('🔁 반복재생 🔁')
        .setDescription(`<a:x_:988403926288199731> 반복재생 모드가 비활성화 되었어요`)
        .addField("요청자", `${interaction.member.user}`, true)
      interaction.reply({ embeds: [embed] })
    }
  },
};