const player = require('../../pleyer')
player.on("queueEnd", (queue, track) => {
    let playl = new (require('discord.js')).MessageEmbed()
        .setColor("BLUE")
        .setTitle("끝!")
        .setDescription(`노래가 끝났어요!`)
    queue.metadata.send({ embeds: [playl] })
})