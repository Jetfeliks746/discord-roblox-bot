const {
    Client,
    Message,
    EmbedBuilder,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
} = require('discord.js')

const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'Queue',
    description: 'Displays current song queue in the Discord Server!',
    data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Displays current song queue in the Discord Server!')
    .addNumberOption((option) => option.setName("page").setDescription("Page number of the queue").setMinValue(1)),
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
            const queue = await bot.player.getQueue(interaction.guildId)
            const page = (interaction.options.getNumber("page") || 1) - 1
            await interaction.deferReply({ephemeral: true})
        try {
           if (!queue || !queue.playing){
            return await interaction.editReply("There aren't any songs currently in the Queue.")
           } 

           const totalPages = Math.ceil(queue.tracks.length / 10) || 1

           if (page > totalPages)
           return await interaction.editReply(`Invalid Page. There are currently a Total of ${totalPages} pages of songs in the Queue.`)

           const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
                return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`    
           }).join("\n")

           const currentSong = queue.current

           await interaction.editReply({
             embeds: [
                new EmbedBuilder()
                .setDescription(`**Currently Playing**\n` + 
                (currentSong ? `\`\[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") + 
                `\n\n**Queue**\n${queueString}`
                )
                .setFooter({
                    text: `Page ${page + 1} of ${totalPages}`
                })
                .setThumbnail(currentSong.thumbnail)
             ]
           })

    } catch (err) {
        console.log(err.message)
        interaction.editReply("No Results")
    }
        },
}