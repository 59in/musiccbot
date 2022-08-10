const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("재생목록")
        .setDescription("재생목록을 표시해요."),
    async execute(interaction, client, player) {
        if(!interaction.guild) return interaction.reply("서버에서만 사용할수 있습니다.")
        const nickname = interaction.member.nickname || interaction.member.user
        const queue = player.getQueue(interaction.guild.id);
        if (!queue || !queue.playing) return interaction.reply({ content: '현재 재생되고 있는 음악이 없습니다.' })

        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. **${m.title}** ([link](${m.url}))`;
        });

        return void interaction.reply({
            embeds: [
                {
                    title: `재생목록 \`${interaction.guild.name}\``,
                    description: `${tracks.join("\n")}${
                        queue.tracks.length > tracks.length
                            ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}`
                            : ""
                    }`,
                    color: 0x00e1ff,
                    fields: [{ name: "지금 재생중", value: `**${currentTrack.title}** ([link](${currentTrack.url}))` }]
                }
            ]
        });
    }
}