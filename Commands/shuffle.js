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
    name: 'Shuffle',
    description: 'Shuffles songs in the Queue.',
    data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffles songs in the Queue.'),
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

            queue.shuffle()
            await interaction.editReply(`The queue of ${queue.tracks.length} songs have been shuffled!`)

    } catch (err) {
        console.log(err.message)
        interaction.editReply("No Results")
    }
        },
}