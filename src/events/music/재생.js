const player = require('../../pleyer')
const comma = require('comma-number')
const { getYouTubeThumbnail } = require("yt-vimeo-thumbnail/dist/youtube/getYouTube");
player.on("trackStart", (queue, track) => {
    let playl = new (require('discord.js')).MessageEmbed()
        .setColor("BLUE")
        .setTitle("πΆ λΈλλ₯Ό μ¬μν©λλ€! πΆ")
        .setURL(`${track.url}`)
        .setDescription(`<a:o_:988403926288199731>` + `\`${track.title}\`` + `(μ΄)κ° μ§κΈ μ¬μλκ³  μμ΅λλ€!`)
        .addField("κΈΈμ΄", `${track.duration}`, true)
        .addField("μ‘°νμ", `${comma(track.views)}`, true)
        .addField("κ²μμ", `${track.author}`, true)
        .setThumbnail(getYouTubeThumbnail(`${track.url}`))
    queue.metadata.send({ embeds: [playl] })
})