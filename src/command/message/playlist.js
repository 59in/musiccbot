module.exports = {
    name: "재생목록",
    description: "재생목록을 표시해요.",
    async execute(message, args, client) {
        const player = require('../../pleyer')
        const queue = player.getQueue(message.guild.id);
        if (!message.member || !message.member.voice.channel) return message.reply({ content: '먼저 음성 채널에 들어가주세요.' })

        if (!queue || !queue.playing) return message.reply({ content: '현재 재생되고 있는 음악이 없습니다.' })
    
        if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: '봇이 있는 음성 채널에 들어가 주십시오.' })

        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. **${m.title}** ([link](${m.url}))`;
        });

        return void message.channel.send({
            embeds: [
                {
                    title: `재생목록 \`${message.guild.name}\``,
                    description: `${tracks.join("\n")}${
                        queue.tracks.length > tracks.length
                            ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}`
                            : ""
                    }`,
                    color: 0x00e1ff,
                    fields: [{ name: "지금 재생중", value: `🎶 | **${currentTrack.title}** (${currentTrack.url})` }]
                }
            ]
        });
    }
}