const { QueryType } = require('discord-player')
const Discord = require('discord.js')
const player = require('../../pleyer')
const comma = require('comma-number')
const { getYouTubeThumbnail } = require("yt-vimeo-thumbnail/dist/youtube/getYouTube");


module.exports = {
  name: '재생',
  description: '노래를 재생해요.',
  async execute(message, args, client, track) {
    if (!args[0]) return message.reply('<a:x_:988403926288199731> 음악 이름을 알려주세요')
    const query = args.join(' ')
    const yts = require('yt-search')
    const r = await yts (args.join(' '))

    if (!message.member || !message.member.voice.channel) return message.reply('<a:x_:988403926288199731> 먼저 음성 채널에 가입하세요')
    
    if (message.guild.me.voice.channel) {
      if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply('<a:x_:988403926288199731> 봇이 다른 채널에서 사용되고 있습니다')
    }

    const searchResult = await player.search(query, {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO
    }).catch(() => {})

    if (!searchResult || !searchResult.tracks.length) return message.reply('<a:x_:988403926288199731> 검색된 결과가 없습니다')

    const queue = await player.createQueue(message.guild, {
      metadata: message.channel
    })

    try {
      if (!queue.connection) await queue.connect(message.member.voice.channel)
    } catch (error) {
      console.log(error)
      player.deleteQueue(message.guild.id)
      return message.reply('음성 채널에 참여할 수 없습니다')
    }
    let playgo = new (require('discord.js')).MessageEmbed()
      .setColor("BLUE")
      .setTitle("🎶 노래를 재생목록에 추가합니다! 🎶")
      .setURL(`${searchResult.tracks[0].url}`)
      .setDescription(`<a:o_:988403926288199731>` + `\`${searchResult.tracks[0].title}\`` + `(이)가 재생목록에 추가되었습니다!`)
      .addField("길이", `${searchResult.tracks[0].duration}`, true)
      .addField("조회수", `${comma(searchResult.tracks[0].views)}`, true)
      .addField("게시자", `${searchResult.tracks[0].author}`, true)
      .setThumbnail(getYouTubeThumbnail(`${searchResult.tracks[0].url}`))
      message.channel.send({ embeds: [playgo] })
      searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0])
      if (!queue.playing) await queue.play()
    
          }
      }
