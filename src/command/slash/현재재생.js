const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports ={
    data: new SlashCommandBuilder()
        .setName("현재재생")
        .setDescription("현재 재생중인 곡을 표시해요."),
    async execute(interaction, client, player){
        if(!interaction.guild) return interaction.reply("서버에서만 사용할수 있습니다.")
        const nickname = interaction.member.nickname || interaction.member.user
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: '<a:x_:988403926288199731> 현재 재생되고 있는 음악이 없습니다.' })

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void interaction.reply({
            embeds: [
                {
                    title: `지금 재생중 \`${interaction.guild.name}\``,
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress
                        }
                    ],
                    color: 0x00e1ff
                }
            ]
        });
    }
}