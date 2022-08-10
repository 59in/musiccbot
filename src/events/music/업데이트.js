const client = require('../../../index')
const Discord = require("discord.js");
const player = require('../../pleyer')
const Schema = require('../../models/뮤직셋업_리스트')
const comma = require('comma-number')
const { getYouTubeThumbnail } = require("yt-vimeo-thumbnail/dist/youtube/getYouTube");
const { MessageActionRow, MessageButton } = require("discord.js");

player.on("trackStart", async (queue, track) => {
    if (!queue.guild) return;
    const find = await Schema.findOne({ guildid: queue.guild.id });
    const gdid = queue.guild.id
    const gdname = queue.guild.name
    const gdicon = queue.guild.iconURL()
    if (find) {
        const queue = player.getQueue(gdid);
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. **${m.title}** ([link](${m.url}))`;
        });

        const chid = find.channelid
        const msgid = find.messageid

        const channel = client.channels.cache.get(chid)
        const msg = await channel.messages.fetch(msgid, { cache: true });
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

        return void await msg.edit({
            embeds: [
                new Discord.MessageEmbed()
                    .setAuthor('🎶 Mora Music 🎶', client.user.displayAvatarURL())
                    .setTitle('지금 재생중인 노래')
                    .setFooter(gdname, gdicon)
                    .setDescription(`**${currentTrack.title}** ([link](${currentTrack.url}))
                    
대기중인 노래
${tracks.join("\n")}${queue.tracks.length > tracks.length
? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}`
: ""}`)
                    .setTimestamp()
                    .setColor('GREEN')
                    .setImage(getYouTubeThumbnail(`${track.url}`))
            ], components: [row]
        })
    }
})

player.on("trackAdd", async (queue, track) => {
    if (!queue.guild) return;
    const find = await Schema.findOne({ guildid: queue.guild.id });
    const gdid = queue.guild.id
    const gdname = queue.guild.name
    const gdicon = queue.guild.iconURL()
    if (find) {
        const queue = player.getQueue(gdid);
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. **${m.title}** ([link](${m.url}))`;
        });

        const chid = find.channelid
        const msgid = find.messageid

        const channel = client.channels.cache.get(chid)
        const msg = await channel.messages.fetch(msgid, { cache: true });
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

        return void await msg.edit({
            embeds: [
                new Discord.MessageEmbed()
                    .setAuthor('🎶 Mora Music 🎶', client.user.displayAvatarURL())
                    .setTitle('지금 재생중인 노래')
                    .setFooter(gdname, gdicon)
                    .setDescription(`**${currentTrack.title}** ([link](${currentTrack.url}))
                    
대기중인 노래
${tracks.join("\n")}${queue.tracks.length > tracks.length
? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}`
: ""}`)
                    .setTimestamp()
                    .setColor('GREEN')
            ], components: [row]
        })
    }
})


player.on("queueEnd", async (queue, track) => {
    if (!queue.guild) return;
    const find = await Schema.findOne({ guildid: queue.guild.id });
    if (find) {
        const chid = find.channelid
        const msgid = find.messageid

        const channel = client.channels.cache.get(chid)
        const msg = await channel.messages.fetch(msgid, { cache: true });
        await msg.edit({
            embeds: [
                new Discord.MessageEmbed()
                    .setAuthor('🎶 Mora Music 🎶', client.user.displayAvatarURL())
                    .setTitle('재생중인 노래가 없어요')
                    .setFooter(queue.guild.name, queue.guild.iconURL())
                    .setDescription('**노래를 재생하시려면 통화방에 참가후 제목을 알려주세요!**')
                    //.setImage('https://img.koreadev.co.kr/001.png')
                    .setTimestamp()
                    .setColor('GREEN')
            ], components: []
        })
    }
})