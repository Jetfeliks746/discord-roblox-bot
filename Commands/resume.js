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
    name: 'Resume',
    description: 'Resumes the current song to where you left off.',
    data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes the current song to where you left off.'),
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

            queue.setPaused(false)
            await interaction.editReply("The current song has been resumed! Use `/pause` to pause the currently playing song.")

    } catch (err) {
        console.log(err.message)
        interaction.editReply("No Results")
    }
        },
}