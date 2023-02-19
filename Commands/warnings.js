const {
    Client,
    Message,
    EmbedBuilder,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    Guild,
    GuildMember,
    PermissionsBitField
} = require('discord.js')

const db = require('quick.db')
const { SlashCommandBuilder, userMention } = require('@discordjs/builders')

module.exports = {
    name: 'Warnings',
    description: `Get a member's Warnings in the Discord Server!`,
    data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription(`Get a member's Warnings in the Discord Server!`)
    .addUserOption(option =>
        option.setName('username')
        .setDescription('User for Warnings').setRequired(true)
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
          
            await interaction.deferReply({ephemeral: true})
            try {
                if (username) {
                  if (bot.user === username) return interaction.editReply(`**ERROR** | I don't have Warnings!`)
                  if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.editReply(`**ERROR** | You don't have permission to use this command!`)
                  if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.editReply(`**ERROR** | I don't have permission to execute this command!`)
                  if (interaction.member.user.bot = username.bot) { 
                  await interaction.editReply(`**ERROR** | Other Bots don't have Warnings!`)
                  } else {
          let warns = bot.db.get(`userWarnings_${interaction.guild.id}_${username.id}`)
          let Warnings = bot.db.get(`userWarnings_${interaction.guild.id}_${username.id}.warnings`);
          let Reasons = bot.db.get(`userWarnings_${interaction.guild.id}_${username.id}.reasons`);
                interaction.editReply({ content: `Successfully got **${username}** Warnings in the ${interaction.guild.name} Server!`,
            })
              let embed = new EmbedBuilder()
                  .setTitle(`**Moderation Report**`)
                  .setDescription(`**Username:**\n${username.username}\n**Discriminator:**\n${username.discriminator}\n**User Tag:**\n${username.tag}\n**User Mention:**\n${username}\n**UserId:**\n${username.id}\n**Moderation Type:**\nGet User's Warnings\n**Number of Warnings:**\n${Warnings || 0}\n**Reasons:**\n${Reasons || 'None'}\n**Moderator:**`)
                  .setColor('White')
                  .setAuthor({ name: username.username, iconURL: username.displayAvatarURL() })
                  .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL() })
                  .setTimestamp(Date.now());
                  interaction.channel.send({ embeds: [embed] })
                  console.log(warns)
                  }} else {
                interaction.editReply({ content: `Failed to Warn **${username}** in the ${interaction.guild.name} Server!`,
        })
        }
            } catch (error) {
                console.log(error.message)
            }
        },
}