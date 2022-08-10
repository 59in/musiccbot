const { QueryType } = require('discord-player')
const Discord = require('discord.js')
const comma = require('comma-number')
const { getYouTubeThumbnail } = require("yt-vimeo-thumbnail/dist/youtube/getYouTube");

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("재생")
        .setDescription("노래를 재생해요.")
        .addStringOption(options => options
            .setName("query")
            .setDescription("노래 이름을 적어주세요")
            .setRequired(true)
        ),
  async execute(interaction, client, player) {
    if(!interaction.guild) return interaction.reply("서버에서만 사용할수 있습니다.")
    await interaction.deferReply({ });
    /**
     * @param { CommandInteraction } Interaction
     */ 
    const query = interaction.options.getString("query")
    const nickname = interaction.member.nickname || interaction.member.user
    
    const searchResult = await player.search(query, {
      requestedBy: interaction.author,
      searchEngine: QueryType.AUTO
    }).catch(() => {})

    if (!searchResult || !searchResult.tracks.length) return interaction.followUp('<a:x_:941623055703236639> 검색된 결과가 없습니다')

    const queue = await player.createQueue(interaction.guild, {
      metadata: interaction.channel
    })

    try {
      if (!queue.connection) await queue.connect(interaction.member.voice.channel)
    } catch (error) {
      player.deleteQueue(interaction.guild.id)
      return interaction.followUp('음성 채널에 참여할 수 없습니다')
    }
    let playgo = new (require('discord.js')).MessageEmbed()
      .setColor("BLUE")
      .setTitle("🎶 노래를 재생목록에 추가합니다! 🎶")
      .setURL(`${searchResult.tracks[0].url}`)
      .setDescription(`<a:o_:941623085788975206>` + `\`${searchResult.tracks[0].title}\`` + `(이)가 재생목록에 추가되었습니다!`)
      .addField("길이", `${searchResult.tracks[0].duration}`, true)
      .addField("조회수", `${comma(searchResult.tracks[0].views)}`, true)
      .addField("게시자", `${searchResult.tracks[0].author}`, true)
      .setThumbnail(getYouTubeThumbnail(`${searchResult.tracks[0].url}`))
    interaction.followUp({ embeds: [playgo] })
    searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0])
    if (!queue.playing) await queue.play()
  }
}

