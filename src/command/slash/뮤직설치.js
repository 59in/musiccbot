const { SlashCommandBuilder } = require("@discordjs/builders");
const Schema = require('../../models/뮤직셋업_리스트')
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("뮤직")
        .setDescription(`채널 뮤직을 설치합니다.`),
    async execute(interaction, client) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.followUp({
            embeds: [
                new MessageEmbed()
                    .setTitle("권한이 없습니다.")
                    .setColor(`RED`)
                    .setDescription("❌서버에 관리자 권한이 부족하여 사용이 불가능합니다.")
            ]
        })
        const find = await Schema.findOne({ guildid: interaction.guild.id });
        const embed1 = new MessageEmbed()
            .setTitle("뮤직셋업 시스템")
            .setColor("YELLOW")
            .setTimestamp()
            .setDescription(`이미 서버에 뮤직이 등록되어있어요!`)
        if (find) return interaction.reply({ embeds: [embed1] });
        const set = await interaction.guild.channels.create('🎶ㅣMora Music', { type: 'category' }).then(result => {

            const gg = new MessageEmbed()
                .setAuthor('🎶 Mora Music 🎶', client.user.displayAvatarURL())
                .setTitle('재생중인 노래가 없어요')
                .setFooter(interaction.guild.name, interaction.guild.iconURL())
                .setDescription('**노래를 재생하시려면 통화방에 참가후 제목을 알려주세요!**')
                //.setImage('https://img.koreadev.co.kr/001.png')
                .setTimestamp()
                .setColor('GREEN')
            const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId("m_play")
                    .setLabel("재개")
                    .setEmoji('<:start:977461540330569748>')
                    .setStyle("SECONDARY"),
                new MessageButton()
                    .setCustomId("m_repeat")
                    .setLabel("반복재생")
                    .setEmoji('<:replay:977462091801849906>')
                    .setStyle("SECONDARY"),
                new MessageButton()
                    .setCustomId("m_skip")
                    .setLabel("스킵")
                    .setEmoji('<:fastUp:977462254637289512>')
                    .setStyle("SECONDARY"),
                new MessageButton()
                    .setCustomId("m_stop")
                    .setLabel("정지")
                    .setEmoji('<:stop:977462178061905990>')
                    .setStyle("SECONDARY"),
                new MessageButton()
                    .setCustomId("m_pause")
                    .setLabel("일시정지")
                    .setEmoji('<:stop:977461951573671936>')
                    .setStyle("SECONDARY"),
            );
            client.channels.cache.get(result.id).send({ embeds: [gg] }).then(tt => {
                const newData = new Schema({
                    guildid: interaction.guild.id,
                    channelid: result.id,
                    messageid: tt.id
                });
                newData.save();
            })
            const embed = new MessageEmbed()
                .setTitle("뮤직셋업 시스템")
                .setColor("YELLOW")
                .setTimestamp()
                .setDescription(`성공적으로 '${interaction.guild.name}' 서버에 뮤직기능이 설치되었어요!`)
                .addField("링크된 채널", `<#${result.id}>`, true);
            interaction.reply({ embeds: [embed] });
        })
    }
}