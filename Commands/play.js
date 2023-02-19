const {
    Client,
    Message,
    EmbedBuilder,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
} = require('discord.js')

const { SlashCommandBuilder } = require('@discordjs/builders')
const { QueryType } = require('discord-player')

module.exports = {
    name: 'Play',
    description: 'Plays music in the Discord Server!',
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays music in the Discord Server!')
    /*.addSubcommand((subcommand)=>
            subcommand
            .setName("song")
            .setDescription("Loads a single song from a url")
            .addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
            )
    .addSubcommand((subcommand)=>
            subcommand
            .setName("playlist")
            .setDescription("Loads a playlist of songs from a url")
            .addStringOption((option) => option.setName("url").setDescription("the playlist's url").setRequired(true))
            )*/
    .addSubcommand((subcommand)=>
            subcommand
            .setName("search")
            .setDescription("Searches for song based on provided keywords")
            .addStringOption((option) => option.setName("search").setDescription("The search keywords").setRequired(true))
            ),
        /**
         * 
         * @param {Client} bot
         * @param {Message} message
         * @param {String[]} args
         */
        async execute(bot, message, args) {},

        /**
         * 
         * @param {Client} bot
         * @param {CommandInteraction} interaction
         */
        async slashexecute(bot, interaction) {
            const queue = await bot.player.createQueue(interaction.guild, { metadata: interaction.channel, autoSelfDeaf: true, leaveOnEnd: false, leaveOnStop: false, leaveOnEmpty: false, leaveOnEndCooldown: 10,
                leaveOnEmptyCooldown: 10, ytdlOptions: { quality: "highest", filter: "audioonly", highWaterMark: 1 << 25, dlChunkSize: 0, },  initialVolume: 100,
                bufferingTimeout: 10,
                spotifyBridge: true,
                disableVolume: false,
                volumeSmoothness: 0.08, })
            //let url = interaction.options.getString("url")
            let url2 = interaction.options.getString("search")
            await interaction.deferReply({ephemeral: true})
        try {
            if (!interaction.member.voice.channel)
            return interaction.editReply("You must be in a Voice Channel to run this command!")
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)
                const embed = new EmbedBuilder()
                /*if (interaction.options.getSubcommand() === "song") {
                    const result = await bot.player.search(url, {
                        requestedBy: interaction.user,
                        searchEngine: QueryType.SOUNDCLOUD_TRACK
                    })
                    if (result.tracks.length === 0)
                    return interaction.editReply("No Results")

                    const song = result.tracks[0]
                    await queue.addTrack(song)
                  embed
                  .setTitle(`**Song Player**`)
                  .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                  .setThumbnail(song.thumbnail)
                  .setFooter({ text: `Duration: ${song.duration}`})
                  .setTimestamp(Date.now())
                  if (counter == 0) {
                    queue.play()
                await interaction.editReply({
                    embeds: [embed]
                })
                }
             } else if (interaction.options.getSubcommand() === "playlist") {
                    const result = await bot.player.search(url, {
                        requestedBy: interaction.user,
                        searchEngine: QueryType.SOUNDCLOUD_PLAYLIST
                    })

                    console.log(result)
                    if (result.tracks.length === 0)
                    return interaction.editReply("No Results")

                    const playlist = result.playlist
                    await queue.addTracks(result.tracks)
                  embed
                  .setTitle(`**Playlist Player**`)
                  .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
                  .setThumbnail(playlist.thumbnail)
                  .setTimestamp(Date.now())
        } else*/ if (interaction.options.getSubcommand() === "search") {
            const result = await bot.player.search(url2, {
                requestedBy: interaction.user,
                searchEngine: QueryType.SOUNDCLOUD_SEARCH
            })

            if (result.tracks.length === 0)
            return interaction.editReply("No Results")

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
          .setTitle(`**Search Player**`)
                  .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                  .setThumbnail(song.thumbnail)
                  .setFooter({text: `Duration: ${song.duration}`})
                  .setTimestamp(Date.now())  
       
        }

        bot.player.on('queueEnd', () => {
            Promise.all([
            interaction.member.voice.channel.members.forEach((member) => { member.voice.disconnect() }),
            interaction.guild.members.me.voice.disconnect()
            ]);
        })

     if (!queue.playing) await queue.play()
    await interaction.editReply({
       embeds: [embed]
   })

    } catch (err) {
        console.log(err.message)
        interaction.editReply("No Results")
    }
        },
}