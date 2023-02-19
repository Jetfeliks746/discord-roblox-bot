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
    name: 'Kick',
    description: 'Kick a member in the Discord Server!',
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member in the Discord Server!')
    .addUserOption(option =>
        option.setName('username')
        .setDescription('User to Kick').setRequired(true)
        )
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('Reason for Kick')
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
            const username = interaction.options.getUser('username')
            const reason = interaction.options.getString('reason') || "No Reason Provided!"
            await interaction.deferReply({ephemeral: true})
            try {
                if (username && reason && interaction.options.getMember('username').kickable) {
                  let embed = new EmbedBuilder()
                  .setTitle(`**Moderation Report**`)
                  .setDescription(`**Username:**\n${username.username}\n**Discriminator:**\n${username.discriminator}\n**User Tag:**\n${username.tag}\n**User Mention:**\n${username}\n**UserId:**\n${username.id}\n**Moderation Type:**\nKick from Discord Server\n**Reason:**\n${reason}\n**Moderator:**`)
                  .setColor('Red')
                  .setAuthor({ name: username.username, iconURL: username.displayAvatarURL() })
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
                interaction.options.getMember('username').kick(reason)
                interaction.editReply({ content: `Successfully Kicked **${username}** from the Server!`,
            })
              interaction.channel.send({ embeds: [embed] })
        } else {
                interaction.editReply({ content: `Failed to Kick **${username}** from the Server!`,
        })
        }
            } catch (error) {
                console.log(error.message)
            }
        },
}