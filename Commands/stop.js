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
    name: 'Stop',
    description: 'Stops the current song and clears the Queue.',
    data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the current song and clears the Queue.'),
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

            queue.destroy()
            await interaction.editReply("Queue has cleared and current song has stopped! If you would like to play again use the **/play** command").then(() => {
                Promise.all([
                interaction.member.voice.channel.members.forEach((member) => { member.voice.disconnect() }),
                interaction.guild.members.me.voice.disconnect()
                ]);
        });

    } catch (err) {
        console.log(err.message)
        interaction.editReply("No Results")
    }
        },
}