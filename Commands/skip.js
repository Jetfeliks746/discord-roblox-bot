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
    name: 'Skip',
    description: 'Skips the current song to the next song in the Queue.',
    data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song to the next song in the Queue.'),
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
            await interaction.deferReply({ephemeral: true})
        try {
           if (!queue)
            return await interaction.editReply("There aren't any songs currently in the Queue.")

            const currentSong = queue.current

            queue.skip()
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder().setDescription(`${currentSong.title} has been skipped!`).setThumbnail(currentSong.thumbnail)
                ]
            })

    } catch (err) {
        console.log(err.message)
        interaction.editReply("No Results")
    }
        },
}