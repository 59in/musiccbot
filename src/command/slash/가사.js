const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("가사")
        .setDescription("가사를 검색해요")
        .addStringOption(options => options
            .setName("제목")
            .setDescription("노래 제목을 입력해주세요")
            .setRequired(true)
        )
        .addStringOption(options => options
            .setName("아티스트")
            .setDescription("노래 아티스트를 입력해주세요")
            .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply({});
        let name = interaction.options.getString("제목")
        let artist = interaction.options.getString("아티스트")
        const url = `https://remapi.xyz:2/lyrics/${name}/${artist}`
        try {
            fetch(url).then(res => res.json()).then(async json => {
                const dd = new MessageEmbed()
                    .setTitle(`${json.name} 노래의 가사에요!`)
                    .setDescription(`${json.lyrics}`)
                    .setColor("BLUE")
                await interaction.followUp({ embeds: [dd] })
            })
        } catch (error) {
            await interaction.followUp(error)
        }
    }
}