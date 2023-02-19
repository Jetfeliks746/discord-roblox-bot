const {
    Client,
    Message,
    EmbedBuilder,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    Guild,
    GuildMember,
} = require('discord.js')

const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'Timeout',
    description: 'Timeout a member in the Discord Server!',
    data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout a member in the Discord Server!')
    .addUserOption(option =>
        option.setName('username')
        .setDescription('User to Timeout').setRequired(true)
        )
      .addIntegerOption(option =>
        option.setName('duration')
          .setDescription('Duration of Timeout')
            .addChoices(
              {
                name: "1 Minute",
                value: 60000
              },
              {
                name: "5 Minutes",
                value: 300000
              },
              {
                name: "10 Minutes",
                value: 600000
              },
              {
                name: "1 Hour",
                value: 3600000
              },
              {
                name: "1 Day",
                value: 86400000
              },
              {
                name: "1 Week",
                value: 604800000
              }
              )
        .setRequired(true))
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('Reason for Timeout')),
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
            const duration = interaction.options.getInteger('duration')
            const reason = interaction.options.getString('reason') || "No Reason Provided!"
            await interaction.deferReply({ephemeral: true})
            try {
                if (username && duration && reason && interaction.options.getMember('username').moderatable) {
                  const addMilliseconds = (date, milliseconds) => {
  const result = new Date(date);
  result.setMilliseconds(result.getMilliseconds() + milliseconds);
  return result.toLocaleString('en-US', {timeZone: 'America/New_York'});
};
                  let date = new Date()
                  let embed = new EmbedBuilder()
                  .setTitle(`**Moderation Report**`) .setDescription(`**Username:**\n${username.username}\n**Discriminator:**\n${username.discriminator}\n**User Tag:**\n${username.tag}\n**User Mention:**\n${username}\n**UserId:**\n${username.id}\n**Moderation Type:**\nTimeout\n**Timedout Until:**\n${addMilliseconds(date, duration)}\n**Moderator:**`)
                  .setColor('Red')
                  .setAuthor({ name: username.username, iconURL: username.displayAvatarURL() })
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
                interaction.options.getMember('username').timeout(duration, reason)
                interaction.editReply({ content: `Successfully Timedout **${username}** in the Server!`,
            })
                   interaction.channel.send({ embeds: [embed] })
        } else {
                interaction.editReply({ content: `Failed to Timeout **${username}** in the Server!`,
        })
        }
            } catch (error) {
                console.log(error.message)
            }
        },
}