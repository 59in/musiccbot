const { MessageEmbed } = require('discord.js')
const player = require('../../pleyer')

module.exports = {
  name: '반복재생',
  description: '노래를 반복재생해요.',
  async execute(message, args, client) {
    const queue = player.getQueue(message.guild.id)

    if (!message.member || !message.member.voice.channel) return message.reply({ content: '<a:x_:988403926288199731> 먼저 음성 채널에 들어가주세요.' })

    if (!queue || !queue.playing) return message.reply({ content: '<a:x_:988403926288199731> 현재 재생되고 있는 음악이 없습니다.' })

    if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '<a:x_:988403926288199731> 봇이 있는 음성 채널에 들어가 주십시오.' })

    if (args[0] == '켜기' || args[0] == 'ㅋㄱ') {
      queue.setRepeatMode(1)

      const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('🔁 반복재생 🔁')
      .setDescription(`<a:o_:988403926288199731988403926288199731> 반복재생 모드가 활성화 되었어요`)
      .addField("요청자", `${message.author}`, true)

      message.channel.send({ embeds: [embed] })
      console.log(`${message.author.tag}명령어 호출 - 반복재생 켜기`)
    } else if (args[0] == '끄기' || args[0] == 'ㄲㄱ') {
      queue.setRepeatMode(2)

      const embed = new MessageEmbed()
      .setColor('RED')
      .setTitle('🔁 반복재생 🔁')
      .setDescription(`<a:x_:988403926288199731> 반복재생 모드가 비활성화 되었어요`)
      .addField("요청자", `${message.author}`, true)

      message.channel.send({ embeds: [embed] })
      console.log(`${message.author.tag}명령어 호출 - 반복재생 끄기`)
    } else {
      return message.reply({ content: '<a:x_:988403926288199731> 입력하신 옵션이 올바르지 않습니다. (켜기 혹은 끄기)' })
    }
  }
}