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
    name: 'Pause',
    description: 'Pauses the currently playing song!',
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the currently playing song!'),
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

            queue.setPaused(true)
            await interaction.editReply("Currently playing song has been paused! Use `/resume` to continue playing the current song.")

    } catch (err) {
        console.log(err.message)
        interaction.editReply("No Results")
    }
        },
}