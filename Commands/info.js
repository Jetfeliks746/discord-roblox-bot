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
    name: 'Info',
    description: 'Displays info about the currently playing song.',
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Displays info about the currently playing song.'),
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

            let bar = queue.createProgressBar({
                queue: false,
                length: 19
            })

            console.log(queue)

            const song = queue.current

            await interaction.editReply({
                embeds: [new EmbedBuilder()
                .setThumbnail(song.thumbnail)
                .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar)
            ],
            })

    } catch (err) {
        console.log(err.message)
        interaction.editReply("No Results")
    }
        },
}