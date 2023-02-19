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
    name: 'Skipto',
    description: 'Skips the current song to the specified song track number in the Queue.',
    data: new SlashCommandBuilder()
    .setName('skipto')
    .setDescription('Skips the current song to the specified song track number in the Queue.')
    .addNumberOption((option) => 
    option.setName('tracknumber').setDescription('The track to skip to').setMinValue(1).setRequired(true)),
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
            const trackNum = interaction.options.getNumber('tracknumber')
            await interaction.deferReply({ephemeral: true})
        try {
           if (!queue)
            return await interaction.editReply("There aren't any songs currently in the Queue.")

            if (trackNum > queue.tracks.length)
                return await interaction.editReply("Invalid track number")
            queue.skipTo(trackNum - 1)
            await interaction.editReply(`Skipped ahead to track number ${trackNum}`)

    } catch (err) {
        console.log(err.message)
        interaction.editReply("No Results")
    }
        },
}